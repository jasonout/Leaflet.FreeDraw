
import { Clipper, PolyFillType } from 'clipper-lib';

const Point = google.maps.Point;
const LatLng = google.maps.LatLng;

/**
 * @method latLngsToClipperPoints
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {Array}
 */
export const latLngsToClipperPoints = (map, latLngs) => {

    return latLngs.map(latLng => {
        const point = map.latLngToLayerPoint(typeof latLng.lat === 'function' ? latLng : new LatLng(latLng));
        return { X: point.x, Y: point.y };
    });

};

/**
 * @method clipperPolygonsToLatLngs
 * @param {Object} map
 * @param {Array} polygons
 * @return {Array}
 */
const clipperPolygonsToLatLngs = (map, polygons) => {

    return polygons.map(polygon => {

        return polygon.map(point => {
            const updatedPoint = new Point(point.X, point.Y);
            return map.layerPointToLatLng(updatedPoint);
        });

    });

};

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @param {Object} options
 * @return {LatLng[]}
 */
export default (map, latLngs, options) => {

    const points = Clipper.CleanPolygon(latLngsToClipperPoints(map, latLngs), options.simplifyFactor);
    const polygons = Clipper.SimplifyPolygon(points, PolyFillType.pftNonZero);

    return clipperPolygonsToLatLngs(map, polygons);

};
