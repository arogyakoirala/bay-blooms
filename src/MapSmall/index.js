import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './styles.css'
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2pmZ2RsNGpqNDE1OTJxazdrNzVxNnl2ZSJ9.Qj1ryjt2_OWUmlTKlcEmtA';

function MapSmall(props) {
	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v9',
			center: [ -122.4397, 37.7649 ],
			zoom: 8.7,
			interactive: false,
			dragPan: false,
		});

		// map.scrollZoom.disable(); 

		map.current.on('load', () => {
			// container.value = map;
			// container.dispatchEvent(new CustomEvent("input"));
        
			map.current.addSource('data', {
				type: 'geojson',
				data: props.data
			});
         
			map.current.addLayer({
				'id': 'data-layer',
				'type': 'fill',
				'source': 'data',
				'paint': {
					'fill-color': props.fill, // blue color fill
					'fill-opacity': 0.5
				}
			});
		});
	});

	return (
		<div>

			<span style={ {margin:0, fontSize:'0.75rem'} }><strong>{props.title}</strong></span>
			<p style={ {margin:0,  fontSize:'0.6rem', lineHeight: 1, marginBottom:'0.6rem'} }>{props.desc}</p>
			<div ref={ mapContainer } style={ {height: props.height? props.height: 100} } ></div>
		</div>
	)
}

export default MapSmall