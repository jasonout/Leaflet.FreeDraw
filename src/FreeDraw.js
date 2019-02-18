import { FeatureGroup } from 'leaflet';
import { select } from 'd3-selection';
import { line, curveMonotoneX } from 'd3-shape';
import Set from 'es6-set';
import WeakMap from 'es6-weak-map';
import Symbol from 'es6-symbol';
import { updateFor } from './helpers/Layer';
import { createFor, removeFor, clearFor } from './helpers/Polygon';
import { CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, NONE, ALL, modeFor } from './helpers/Flags';
import simplifyPolygon from './helpers/Simplify';

const Point = google.maps.Point;

/**
 * @constant polygons
 * @type {WeakMap}
 */
export const polygons = new WeakMap();

/**
 * @constant defaultOptions
 * @type {Object}
 */
export const defaultOptions = {
    mode: ALL,
    smoothFactor: 0.3,
    elbowDistance: 10,
    simplifyFactor: 1.1,
    mergePolygons: true,
    concavePolygon: true,
    maximumPolygons: Infinity,
    notifyAfterEditExit: false,
    leaveModeAfterCreate: false,
    strokeWidth: 2,
    fillColor: '#95bc59'
};

/**
 * @constant instanceKey
 * @type {Symbol}
 */
export const instanceKey = Symbol('freedraw/instance');

/**
 * @constant modesKey
 * @type {Symbol}
 */
export const modesKey = Symbol('freedraw/modes');

/**
 * @constant notifyDeferredKey
 * @type {Symbol}
 */
export const notifyDeferredKey = Symbol('freedraw/notify-deferred');

/**
 * @constant edgesKey
 * @type {Symbol}
 */
export const edgesKey = Symbol('freedraw/edges');

/**
 * @constant cancelKey
 * @type {Symbol}
 */
const cancelKey = Symbol('freedraw/cancel');

function latLngToContainerPoint(latLng, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());
	var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
	return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function containerPointToLatLng(pixel, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = 1 << map.getZoom();
    var worldPoint = new google.maps.Point(pixel.x / scale + bottomLeft.x, pixel.y / scale + topRight.y);
    var t = map.getProjection().fromPointToLatLng(worldPoint);

    console.log('containerPointToLatLng: ', t.lat(), t.lng());

	return t;
}

export default class FreeDraw extends FeatureGroup {

    /**
     * @constructor
     * @param {Object} [options = {}]
     * @return {void}
     */
    constructor(options = defaultOptions) {
        super();
        this.options = { ...defaultOptions, ...options };
    }

    /**
     * @method onAdd
     * @param {Object} map
     * @return {void}
     */
    onAdd(map) {

        // Memorise the map instance.
        this.map = map;

        // Attach the cancel function and the instance to the map.
        map[cancelKey] = () => {};
        map[instanceKey] = this;
        map[notifyDeferredKey] = () => {};

        // Setup the dependency injection for simplifying the polygon.
        map.simplifyPolygon = simplifyPolygon;

        // Add the item to the map.
        polygons.set(map, new Set());

        map.dragging = map.dragging || {
            enable: () => map.setOptions({ draggable: true }),
            disable: () => map.setOptions({ draggable: false })
        };

        map.eventMap = {};

        map._container = map.getDiv();

        map.removeLayer = (element) => {
            element && element.setMap && element.setMap(null);
        };

        map.on = (event, handler) => {
            const events = event.split(' ');
            events.forEach(eventName => {
                map.eventMap[eventName] = map.eventMap[eventName] || {};

                if (map.eventMap[eventName][handler]) {
                    return;
                }

                map.eventMap[eventName][handler] = google.maps.event.addListener(map, eventName, handler);
            });
        };
        map.off = (event, handler) => {
            const events = event.split(' ');
            events.forEach(eventName => {
                const eventId = map.eventMap[eventName] && map.eventMap[eventName][handler];

                if (eventId) {
                    google.maps.event.removeListener(eventId);
                    delete map.eventMap[eventName][handler];
                }
            });
        };
        map.fire = (event, eventArgs) => google.maps.event.trigger(map, event, eventArgs);

        map.latLngToContainerPoint = (latLng) => latLngToContainerPoint(latLng, map);
        map.mouseEventToContainerPoint = event => event.pixel;
        map.containerPointToLatLng = (point) => containerPointToLatLng(point, map);
        map.latLngToLayerPoint = map.latLngToContainerPoint;
        map.layerPointToLatLng = map.containerPointToLatLng;

        // Set the initial mode.
        modeFor(map, this.options.mode, this.options);

        // Instantiate the SVG layer that sits on top of the map.
        const svg = this.svg = select(map._container).append('svg')
                                 .classed('free-draw', true).attr('width', '100%').attr('height', '100%')
                                 .style('pointer-events', 'none').style('z-index', '1001').style('position', 'relative');

        // Set the mouse events.
        this.listenForEvents(map, svg, this.options);

    }

    /**
     * @method onRemove
     * @param {Object} map
     * @return {void}
     */
    onRemove(map) {

        // Remove the item from the map.
        polygons.delete(map);

        // Remove the SVG layer.
        this.svg.remove();

        // Remove the appendages from the map container.
        delete map[cancelKey];
        delete map[instanceKey];
        delete map.simplifyPolygon;

    }

    /**
     * @method create
     * @param {LatLng[]} latLngs
     * @param {Object} [options = { concavePolygon: false }]
     * @return {Object}
     */
    create(latLngs, options = { concavePolygon: false }) {
        const created = createFor(this.map, latLngs, { ...this.options, ...options });
        updateFor(this.map, 'create');
        return created;
    }

    /**
     * @method remove
     * @param {Object} polygon
     * @return {void}
     */
    remove(polygon) {
        polygon ? removeFor(this.map, polygon) : super.remove();
        updateFor(this.map, 'remove');
    }

    /**
     * @method clear
     * @return {void}
     */
    clear() {
        clearFor(this.map);
        updateFor(this.map, 'clear');
    }

    /**
     * @method setMode
     * @param {Number} [mode = null]
     * @return {Number}
     */
    mode(mode = null) {

        // Set mode when passed `mode` is numeric, and then yield the current mode.
        typeof mode === 'number' && modeFor(this.map, mode, this.options);
        return this.map[modesKey];

    }

    /**
     * @method size
     * @return {Number}
     */
    size() {
        return polygons.get(this.map).size;
    }

    /**
     * @method all
     * @return {Array}
     */
    all() {
        return Array.from(polygons.get(this.map));
    }

    /**
     * @method cancel
     * @return {void}
     */
    cancel() {
        this.map[cancelKey]();
    }

    /**
     * @method listenForEvents
     * @param {Object} map
     * @param {Object} svg
     * @param {Object} options
     * @return {void}
     */
    listenForEvents(map, svg, options) {
        debugger;

        /**
         * @method mouseDown
         * @param {Object} event
         * @return {void}
         */
        const mouseDown = event => {
            console.log("mouse down");

            if (!(map[modesKey] & CREATE)) {

                // Polygons can only be created when the mode includes create.
                return;

            }

            /**
             * @constant latLngs
             * @type {Set}
             */
            const latLngs = new Set();

            console.log(event.pixel, map.latLngToContainerPoint(event.latLng));

            // Create the line iterator and move it to its first `yield` point, passing in the start point
            // from the mouse down event.
            const lineIterator = this.createPath(map, svg, map.latLngToContainerPoint(event.latLng), options.strokeWidth);
            lineIterator.next();

            /**
             * @method mouseMove
             * @param {Object} event
             * @return {void}
             */
            const mouseMove = event => {

                // Resolve the pixel point to the latitudinal and longitudinal equivalent.
                const point = map.mouseEventToContainerPoint(event.originalEvent || event);

                // Push each lat/lng value into the points set.
                latLngs.add(map.containerPointToLatLng(point));

                // Invoke the generator by passing in the starting point for the path.
                lineIterator.next(new Point(point.x, point.y));

            };

            // Create the path when the user moves their cursor.
            map.on('mousemove touchmove', mouseMove);

            /**
             * @method mouseUp
             * @param {Object} event
             * @param {Boolean} [create = true]
             * @return {Function}
             */
            const mouseUp = (event, create = true) => {

                // Remove the ability to invoke `cancel`.
                map[cancelKey] = () => {};

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousemove', mouseMove);
                'body' in document && document.body.removeEventListener('mouseleave', mouseUp);

                // Clear the SVG canvas.
                svg.selectAll('*').remove();

                // Stop the iterator.
                lineIterator.return();

                if (create) {

                    // ...And finally if we have any lat/lngs in our set then we can attempt to
                    // create the polygon.
                    latLngs.size && createFor(map, Array.from(latLngs), options);

                    // Finally invoke the callback for the polygon regions.
                    updateFor(map, 'create');

                    // Exit the `CREATE` mode if the options permit it.
                    options.leaveModeAfterCreate && this.mode(this.mode() ^ CREATE);

                }

            };

            // Clear up the events when the user releases the mouse.
            map.on('mouseup touchend', mouseUp);
            'body' in document && document.body.addEventListener('mouseleave', mouseUp);

            // Setup the function to invoke when `cancel` has been invoked.
            map[cancelKey] = () => mouseUp({}, false);

        };

        map.on('mousedown touchstart', mouseDown);

    }

    /**
     * @method createPath
     * @param {Object} map
     * @param {Object} svg
     * @param {Point} fromPoint
     * @param {Number} strokeWidth
     * @return {void}
     */
    * createPath(map, svg, fromPoint, strokeWidth) {

        // Define the line function to be used for the hand-drawn lines.
        const lineFunction = line().curve(curveMonotoneX).x(d => d.x).y(d => d.y);

        // Wait for the iterator to be invoked by passing in the next point.
        const toPoint = yield fromPoint;

        // Line data that is fed into the D3 line function we defined earlier.
        const lineData = [fromPoint, toPoint];

        // Draw SVG line based on the last movement of the mouse's position.
        svg.append('path').classed('leaflet-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none')
                                                        .attr('stroke', 'black').attr('stroke-width', strokeWidth);

        // Recursively invoke the generator function, passing in the current to point as the from point.
        yield * this.createPath(map, svg, toPoint, strokeWidth);

    }

}

/**
 * @method freeDraw
 * @return {Object}
 */
export const freeDraw = options => {
    return new FreeDraw(options);
};

export { CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, NONE, ALL } from './helpers/Flags';

if (typeof window !== 'undefined') {

    // Attach to the `window` as `FreeDraw` if it exists, as this would prevent `new FreeDraw.default` when
    // using the web version.
    window.FreeDraw = FreeDraw;
    FreeDraw.CREATE = CREATE;
    FreeDraw.EDIT = EDIT;
    FreeDraw.DELETE = DELETE;
    FreeDraw.APPEND = APPEND;
    FreeDraw.EDIT_APPEND = EDIT_APPEND;
    FreeDraw.NONE = NONE;
    FreeDraw.ALL = ALL;

}
