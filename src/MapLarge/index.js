import React, { useRef, useEffect, useState } from 'react';
import data from '../data'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './styles.css'
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2pmZ2RsNGpqNDE1OTJxazdrNzVxNnl2ZSJ9.Qj1ryjt2_OWUmlTKlcEmtA';

const fills=[ '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33' ]
function MapSmall(props) {
	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v9',
			center: [ -122.4397, 37.7649 ],
			zoom: 11,
			// interactive: false,
			// dragPan: false,
		});

		map.current.addControl(new mapboxgl.NavigationControl());
		map.current.scrollZoom.disable(); 

		map.current.on('load', () => {
			// container.value = map;
			// container.dispatchEvent(new CustomEvent("input"));
			map.current.addSource('grassland', {
				type: 'geojson',
				data: data.grassland
			});
         
			map.current.addLayer({
				'id': 'grassland-layer',
				'type': 'fill',
				'source': 'grassland',
				'paint': {
					'fill-color': fills[ 0 ], // blue color fill
					'fill-opacity': 0.5
				}
			});

			map.current.addSource('coastal', {
				type: 'geojson',
				data: data.coastal
			});
         
			map.current.addLayer({
				'id': 'coastal-layer',
				'type': 'fill',
				'source': 'coastal',
				'paint': {
					'fill-color': fills[ 1 ], // blue color fill
					'fill-opacity': 0.5
				}
			});

			map.current.addSource('dunes', {
				type: 'geojson',
				data: data.dunes
			});
         
			map.current.addLayer({
				'id': 'dunes-layer',
				'type': 'fill',
				'source': 'dunes',
				'paint': {
					'fill-color': fills[ 2 ], // blue color fill
					'fill-opacity': 0.5
				}
			});

			map.current.addSource('riparian', {
				type: 'geojson',
				data: data.riparian
			});
         
			map.current.addLayer({
				'id': 'riparian-layer',
				'type': 'fill',
				'source': 'riparian',
				'paint': {
					'fill-color': fills[ 3 ], // blue color fill
					'fill-opacity': 0.5
				}
			});

			map.current.addSource('wetland', {
				type: 'geojson',
				data: data.wetland
			});
         
			map.current.addLayer({
				'id': 'wetland-layer',
				'type': 'fill',
				'source': 'wetland',
				'paint': {
					'fill-color': fills[ 4 ], // blue color fill
					'fill-opacity': 0.5
				}
			});

			map.current.addSource('woodland', {
				type: 'geojson',
				data: data.woodland
			});
         
			map.current.addLayer({
				'id': 'woodland-layer',
				'type': 'fill',
				'source': 'woodland',
				'paint': {
					'fill-color': fills[ 5 ], // blue color fill
					'fill-opacity': 0.5
				}
			});
		});
	}, []);

	return (
		<div>
			<div ref={ mapContainer } style={ {height: props.height? props.height: 500} } ></div>
		</div>
	)
}

export default MapSmall