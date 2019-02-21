

function latLngToContainerPoint(_latLng, map) {
	var latLng = typeof _latLng.lat === 'function' ? _latLng : new map.LatLng(_latLng)
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());
	var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
	return new map.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function containerPointToLatLng(pixel, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = 1 << map.getZoom();
    var worldPoint = new map.Point(pixel.x / scale + bottomLeft.x, pixel.y / scale + topRight.y);
    var t = map.getProjection().fromPointToLatLng(worldPoint);

	return t;
}

const NOOP = () => {};

function createGoogleMarker(map, latLng, icon, options, fdOptions) {
	const marker = new google.maps.Marker({
		position: latLng,
		icon: {
			 path: 'M-6,0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0',
			 scale: (fdOptions.hideDisabledEdges && !options.isEnabled) ? 0 : 1.25,
			 strokeWeight: 2,
			 fillColor: options.isEnabled ? '#95bc59' : '#adadad',
			 strokeColor: '#fff',
			 fillOpacity: 1
		},
		cursor: 'move'
	});
	marker.setMap(map);

	marker.on = (event, handler) => {
		google.maps.event.addListener(marker, event, handler);
	};

	marker.getLatLng = marker.getPosition;
	marker.setLatLng = marker.setPosition;

	marker.disableClickPropagation = () => {};
	marker.toggle = (enabled) => {
		marker.setCursor(enabled ? 'move' : 'pointer');
		marker.setIcon({
			...marker.icon,
			fillColor: enabled ? '#95bc59' : '#adadad',
			scale: (fdOptions.hideDisabledEdges && !enabled) ? 0 : 1.25
		});
	}

	return marker;
}

function createGooglePolygon(map, latLngs, options) {
	const polygon = new google.maps.Polygon({
		...options,
		strokeColor: '#50622b',
		strokeOpacity: 0.75,
		strokeWeight: 0,
		paths: [latLngs],
		clickable: false
  });

  const polyline = new google.maps.Polyline({
	  path: latLngs.concat(latLngs[0]),
	  clickable: true,
	  strokeColor: '#50622b',
	  strokeOpacity: 0.75,
	  strokeWeight: 2
  });

  	polygon._setMap = polygon._setMap || polygon.setMap;
  	polygon.setMap = (map) => {
		  polygon._setMap(map);
		  polyline.setMap(map);
	}

   polyline.setMap(map);

	polygon.getLatLngs = () => {
		return polygon.getPaths().getArray().map(a => a.getArray());
	}

	polygon.setLatLngs = (latLngs) => {
		polygon.setPaths(latLngs);
		polyline.setPath(latLngs.concat(latLngs[0]));
	};

	polygon.setMap(map);

	polygon.redraw = NOOP;
	polygon.disableClickPropagation = NOOP;
	polygon.on = (event, handler) => {
		google.maps.event.addListener(polyline, event, function (event) {
			handler.call(polygon, event);
	  });
	};
	polygon.off = NOOP;
	polygon.toggle = (editEnabled, appendEnabled) => {
		polyline.setOptions({
			clickable: appendEnabled
		});
	};

	return polygon;
}

export const GoogleFreeDrawConfig = {
	onMapInit: (map, fdOptions) => {
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
		map.mouseEventToContainerPoint = event => event.pixel || latLngToContainerPoint(event.latLng, map);
		map.containerPointToLatLng = (point) => containerPointToLatLng(point, map);
		map.latLngToLayerPoint = map.latLngToContainerPoint;
		map.layerPointToLatLng = map.containerPointToLatLng;

		map.Point = google.maps.Point;
		map.LatLng = google.maps.LatLng;

		map.dragging = map.dragging || {
			enable: () => map.setOptions({ draggable: true, draggableCursor: '' }),
			disable: () => map.setOptions({ draggable: false, draggableCursor: 'crosshair' })
		};

		map.createMarker = (latLng, icon, options) => createGoogleMarker(map, latLng, icon, options, fdOptions);
		map.createPolygon = (latLngs, options) => createGooglePolygon(map, latLngs, options);
		map.makeLatLng = (latLng) => {
			if (latLng instanceof map.LatLng) {
				return latLng;
			}

			if (latLng.lat && latLng.lng) {
				return new map.LatLng(latLng);
			}

			if (latLng[0] && latLng[1]) {
				return new map.LatLng(latLng[0], latLng[1]);
			}

			return latLng;
		}
	}
};

