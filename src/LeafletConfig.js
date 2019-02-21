
import { DivIcon, Point, LatLng, Polygon, Marker, DomEvent, DomUtil } from 'leaflet';

const NOOP = () => {};

function createLeafletMarker(map, latLng, iconSettings, options, fdOptions) {
	const icon = new DivIcon(iconSettings);
	const marker = new Marker(latLng, { icon }).addTo(map);

	marker.disableClickPropagation = () => DomEvent.disableClickPropagation(marker);
	marker.toggle = (enabled) => {
		if (enabled) {
			DomUtil.removeClass(marker._icon, 'disabled');
			if (fdOptions.hideDisabledEdges) {
				marker._icon.style.display = '';
			}
		} else {
			DomUtil.addClass(marker._icon, 'disabled');
			if (fdOptions.hideDisabledEdges) {
				marker._icon.style.display = 'none';
			}
		}
	};
	return marker;
}

function createLeafletPolygon(map, latLngs, options) {
	const polygon = new Polygon(latLngs, options).addTo(map);
	polygon.disableClickPropagation = () => DomEvent.disableClickPropagation(polygon);
	polygon.toggle = NOOP;

	return polygon;
}

export const LeafletFreeDrawConfig = {
	onMapInit: (map, fdOptions) => {
		map.createMarker = (latLng, icon, options) => createLeafletMarker(map, latLng, icon, options, fdOptions);
		map.Point = Point;
		map.LatLng = LatLng;
		map.createPolygon = (latLngs, options) => createLeafletPolygon(map, latLngs, options, fdOptions);
		map.makeLatLng = (l) => {
			if (l instanceof map.LatLng || l.lat && l.lng) { return l; }
			return l;
		};
	}
};

