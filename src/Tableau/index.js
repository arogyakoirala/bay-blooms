import React, { useEffect, useRef } from 'react';
const {tableau} = window;
export const Tableau =()=> {
	const ref = useRef(null);
	const url =  'https://public.tableau.com/views/plants_16835718590190/Dashboard1';
	function initViz(){
		newtableau.Viz(ref.current,url);
	}
	return (
		<div ref={ ref } style={ {width:'70%', margin:'auto'} }> </div>
	);
}