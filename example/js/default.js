import L from 'leaflet';
import FreeDraw, { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from '../../src/FreeDraw';
import { module } from 'angular';

module('leafletApp', []).controller('MapController', $scope => {

    /**
     * @constant MODES
     * @type {Object}
     */
    $scope.MODES = { CREATE, EDIT, DELETE, APPEND, NONE };

    /**
     * @property mode
     * @type {Number}
     */
    $scope.mode = ALL;

    /**
     * @method isDisabled
     * @param mode {Number}
     * @returns {Boolean}
     */
    $scope.isDisabled = mode => !(mode & $scope.mode);

    /**
     * @method stopPropagation
     * @param {Object} event
     * @return {void}
     */
    $scope.stopPropagation = event => event.stopPropagation();

    /**
     * @method toggleMode
     * @param mode {Number}
     * @return {void}
     */
    $scope.toggleMode = mode => {

        if ($scope.isDisabled(mode)) {

            // Enabled the mode.
            $scope.mode = $scope.mode | mode;
            return;

        }

        // Otherwise disable it.
        $scope.mode = $scope.mode ^ mode;

    };

    /**
     * @method setModeOnly
     * @param mode {Number}
     * @return {void}
     */
    $scope.setModeOnly = mode => {
        $scope.mode = $scope.MODES.NONE | mode;
    };

}).directive('map', () => {

    return {

        /**
         * @property restrict
         * @type {String}
         */
        restrict: 'C',

        /**
         * @property scope
         * @type {Object}
         */
        scope: {
            mode: '='
        },

        /**
         * @method controller
         * @param $scope {Object}
         * @return {void}
         */
        controller($scope) {

            /**
             * @constant TILE_URL
             * @type {String}
             */
            $scope.TILE_URL = 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png';
            // $scope.TILE_URL = 'https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=f2ae86661a4e487bbced29a755799884';

        },

        /**
         * @method link
         * @param scope {Object}
         * @param element {Object}
         * @return {void}
         */
        link(scope, element) {

            const FLAVOR = 'leaflet';

            const freeDraw = window.freeDraw = new FreeDraw({
                mode: ALL,
                flavor: FLAVOR,
                hideDisabledEdges: true
            });

            let map;

            if (FLAVOR == 'google') {
                const mapContainer = document.createElement('div');
                mapContainer.classList.add('google-map-container');

                element[0].appendChild(mapContainer);

                map = new google.maps.Map(
                    mapContainer,
                    {
                        zoom: 14,
                        center: { lat: 51.505, lng: -0.09 },
                        clickableIcons: false
                    }
                );

                map.data.add(freeDraw);

                google.maps.event.addListenerOnce(map, 'idle', () => {
                    //freeDraw.create([{"lat":51.504116049664304,"lng":-0.08630147736755589},{"lat":51.50395577127987,"lng":-0.0853573397943137},{"lat":51.503688639386404,"lng":-0.08484235566345433},{"lat":51.50267352390953,"lng":-0.08415571015564183},{"lat":51.501978958185845,"lng":-0.08406987946716526},{"lat":51.50107066395866,"lng":-0.08458486359802464},{"lat":51.50058979498009,"lng":-0.0853573397943137},{"lat":51.49994862844931,"lng":-0.08767476838318089},{"lat":51.499841766483875,"lng":-0.0894772128411887},{"lat":51.50032264335512,"lng":-0.09265294831482151},{"lat":51.50096380462412,"lng":-0.09299627106872776},{"lat":51.50304751645291,"lng":-0.09282460969177464},{"lat":51.504009197470666,"lng":-0.09102216523376683},{"lat":51.50390234502648,"lng":-0.09110799592224339},{"lat":51.50416947566717,"lng":-0.0881039218255637},{"lat":51.504116049664304,"lng":-0.08630147736755589}]);
                    freeDraw.create([[51.504116049664304,-0.08630147736755589],[51.50395577127987,-0.0853573397943137],[51.503688639386404,-0.08484235566345433],[51.50267352390953,-0.08415571015564183],[51.501978958185845,-0.08406987946716526],[51.50107066395866,-0.08458486359802464],[51.50058979498009,-0.0853573397943137],[51.49994862844931,-0.08767476838318089],[51.499841766483875,-0.0894772128411887],[51.50032264335512,-0.09265294831482151],[51.50096380462412,-0.09299627106872776],[51.50304751645291,-0.09282460969177464],[51.504009197470666,-0.09102216523376683],[51.50390234502648,-0.09110799592224339],[51.50416947566717,-0.0881039218255637],[51.504116049664304,-0.08630147736755589]]);
                });

            } else {

                // Instantiate L.Map and the FreeDraw layer, passing in the default mode.
                map = new L.Map(element[0], { doubleClickZoom: false }).setView([51.505, -0.09], 14);

                L.tileLayer(scope.TILE_URL).addTo(map);
                map.addLayer(freeDraw);
            }

            freeDraw.onAdd(map);




            freeDraw.on('mode', event => {

                // Memorise the mode and re-render the directive.
                scope.mode = event.mode;
                !scope.$root.$$phase && scope.$apply();

            });

            // Listen for a change in the mode.
            scope.$watch('mode', mode => freeDraw.mode(mode));

            document.addEventListener('keydown', event => {

                // Cancel the current FreeDraw action when the escape key is pressed.
                event.key === 'Escape' && freeDraw.cancel();

            });


            freeDraw.on('markers', event => {

                // Listen for any markers added, removed or edited, and then output the lat lng boundaries.
                console.log('LatLngs:', event.latLngs, 'Polygons:', freeDraw.size());

            });

            // Exposed for testing purposes.
            window._polygons = polygons.get(map);

        }

    }
});
