import React, {useEffect} from 'react';
import * as d3 from 'd3';
import './styles.css'
// import d3Tip from './d3Tip' 

const dimensions = {
//     width: 800
	margin: {top: 100,
		right: 20,
		bottom: 20,
		left: 200}
};

const valToWord = (val) => {
	if (val < 0.7) {
		return 'weak'
	} else if (val < 0.85) {
		return 'strong'
	} else {
		return 'very strong'
	}
}

const cToWord = {
	water_low: 'low',
	water_moderate: 'moderate',
	water_none: 'none',
	loc_potted_plant: 'as a potted plant', 
	loc_roof: 'on rooftops', 
	loc_sidewalk: 'in the sidewalk', 
	loc_garden: 'in the garden', 
	light_part_shade: 'part shade',
	light_sun: 'sun',
	light_shade: 'shade',
	habitat_nesting: 'provide nesting for birds',
	habitat_pollinator: 'support pollination',
	habitat_cover: 'provide cover',
	habitat_fruit: 'bear fruits',
	habitat_buds: 'bear buds',

}

const getSimilarityText = (assessment) => {
	let text = 'Both of these plants '

	const {similarities} = assessment;

	if (Object.keys(similarities).indexOf('type') !== -1) {
		text += `are the same type (<b>${ similarities.type }</b>) `
	}

	if (similarities.water_needs.length > 0) {
		text += `share similar water needs (<b>${ similarities.water_needs.map(d=>cToWord[ d ]).join(', ') }</b>), `
	}

	if (similarities.sun.length > 0) {
		text += `have similar sunlight needs (<b>${ similarities.sun.map(d=>cToWord[ d ]).join(', ') }</b>) `
	}

	if (similarities.location.length > 0) {
		text += `can be planted <b>${ similarities.location.map(d=>cToWord[ d ]).join(', ') }</b> `
	}

	if (similarities.habitat.length > 0) {
		text += `and can <b>${ similarities.habitat.map(d=>cToWord[ d ]).join(', ') }</b>.`
	}
	return text
}

const whats_similar = (characteristics,a, b) => {
	// return [ a, b ]
	const plant_a = characteristics.filter(d=> d.name==a)[ 0 ]
	const plant_b = characteristics.filter(d=> d.name==b)[ 0 ]
	// return plant_b

	if(plant_b === undefined) {return {similarities:{}, dissimilarities:{}, plants: {plant_a: {}, plant_b: {}}}}
	// return plant_a
	const similarities = {
		habitat: [],
		water_needs: [],
		location: [],
		sun: [],
	}
	const dissimilarities = {    habitat: [],
		water_needs: [],
		location: [],
		sun: []}

	Object.keys(plant_a).forEach(d=> {
		if (plant_a[ d ] === plant_b[ d ]) {
			if (d=='type'){
				similarities.type = plant_a[ d ]
			}
			if (d=='size' && plant_a.size !== 'Varies'){
				similarities.size = plant_a[ d ]
			}
			if (d.includes('habitat')) {
				similarities.habitat.push(d)
			}
			if (d.includes('loc')) {
				similarities.location.push(d)
			}
			if (d.includes('water')) {
				similarities.water_needs.push(d)
			}
			if (d.includes('light')) {
				similarities.sun.push(d)
			}
  
		} else {
			if (d==='type'){
				dissimilarities.type = true
			}
			if (d==='size' && plant_a.size !== 'Varies'){
				dissimilarities.size = true
			}
			if (d.includes('habitat')) {
				dissimilarities.habitat.push({metric: d, winner: plant_a[ d ]===true? plant_a.name: plant_b.name})
			}
			if (d.includes('loc')) {
				dissimilarities.location.push(d)
			}
			if (d.includes('water')) {
				dissimilarities.water_needs.push(d)
			}
			if (d.includes('light')) {
				dissimilarities.sun.push(d)
			}
		}
	})

	return {similarities, dissimilarities, plants: {plant_a, plant_b}}
}

const Chart = (props) => {

	const svgRef = React.useRef(null);
	const {  margin } = dimensions;
	// const svgWidth = width + margin.left + margin.right;
	// const svgHeight = height + margin.top + margin.bottom;

	useEffect(() => {

		// const matrixLayout = adjacencyMatrix2()
		// .size([ width-100,height-100 ]);
		const series = props.data.data
		const bins=props.data.native_labels;
		// const width = bins.length*30;
		const width = 1200;
		const height = 4700;

		const svgEl = d3.select(svgRef.current)
		svgEl.selectAll('*').remove();

		const svg = svgEl.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
		// .attr('viewbox', '50 10 1000 2000')

		const options = [ ...new Set(props.data.properties.map(d => d.origin)) ].sort()
		console.log(options) 
		const labelColor = d3.scaleOrdinal(d3.schemeCategory10).domain(options)
		const x = d3.scaleBand()
			.domain(bins)
			.range([ margin.left, width ])
			.padding(0.1)

		const xAxis = g => g
			.attr('transform', `translate(${ x.bandwidth()/2 },-${ margin.top })`)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.call(g => g.select('.domain').remove())
			.selectAll('text')
			.attr('y', -5)
			.attr('x', 0)
			.attr('dx', -200)
			.attr('dy', '.0em')
			.attr('transform', 'rotate(270)')
			.style('text-anchor', 'start')
			.style('fill','#1f77b4')
			.attr('font-size', 10)

		const y = d3.scaleBand()
			.domain(series.map(d => d.key))
			.range([ margin.top, height ])
			.padding(0.1)
        
		const yAxis = g => g
			.attr('transform', `translate(${ margin.left },0)`)
			.call(d3.axisLeft(y).tickSize(0).tickPadding(4))
			.call(g => g.select('.domain').remove())
			.selectAll('text')
			.style('fill','#ff7f0f')
			.attr('font-size', 10)
          
		const opacity = d3.scaleLog()
			.domain([ 0.7, 1 ])
			.range([ 0.1, 1 ])
			.clamp(true);

		svg.append('g')
			.call(xAxis);

		svg.append('g')
			.call(yAxis);

		svg.append('line')          // attach a line
			.style('stroke', '#ccc')  // colour the line
			.attr('x1', 100)     // x position of the first end of the line
			.attr('y1', 0)      // y position of the first end of the line
			.attr('x2', 200)     // x position of the second end of the line
			.attr('y2', 100);    // y position of the second end of the line

		svg.append('text')          // attach a line
			.style('font-size', '10px')  // colour the line
			.style('fill', '#ccc')  // colour the line
			.attr('transform', 'rotate(44)')
			.attr('x', 100)     // x position of the first end of the line
			.attr('y', -75)  
			// .attr('dy', -35)    // y position of the first end of the line
		  .text('CA Native')
      
		svg.append('text')          // attach a line
			.style('font-size', '10px')  // colour the line
			.style('fill', '#ccc')  // colour the line
			.attr('transform', 'rotate(44)')
			.attr('x', 100)     // x position of the first end of the line
			.attr('y', -75)  
			.attr('dy', 20)    // y position of the first end of the line
			// .attr('dx', 10)    // y position of the first end of the line
		  .text('Exotic')
		const serie = svg.append('g')
			.selectAll('g')
			.data(series)
			.enter().append('g')
			.attr('transform', d => `translate(0,${ y(d.key) + 1 })`);
        
		// const tip = d3Tip().attr('class', 'd3-tip').html((d, i) => {return (bins[ i ] + `${ d.label }`)});
		const tooltip = d3
			.select('#heat')
			.append('rect')
			.attr('class', 'tooltip')
			// .attr('width', 300)
			// .attr('height', 300)
			.attr('y', 0)
			.attr('x', 0)
			// .style('opacity', 1);
		// svg.call(tip)
		serie.append('g')
			.selectAll('rect')
		// .data(d => {console.log(d.value.map(k=> {return {value: k, label: d.key}})); return d.value})
			.data(d => {return d.value.map(k=> {return {value: k, label: d.key}})})
			.enter().append('rect')
			.attr('fill'  , d => d.value > 0.7 ? 'rgba(0,0,0)': 'white')
			.attr('fill-opacity'  , d => d.value > 0.7 ? opacity(d.value): 0)
			.attr('x'     , (d,i) => x(bins[ i ]))
			.attr('y'     , 0)
			.attr('height', y.bandwidth())
			.attr('width' , x.bandwidth())
			.on('mouseover', (d, i) => {
				console.log(getSimilarityText(whats_similar(props.data.properties, bins[ i ], d.label)))
				const text = valToWord(d.value) === 'weak' ? '': '<br/> <br/> '+getSimilarityText(whats_similar(props.data.properties, bins[ i ], d.label))
				d3.select('#tooltip').html(bins[ i ] + ` is a <b>${ valToWord(d.value) }</b> native alternative to ` +d.label + '' + text + '')
			})
			.on('mouseout', d => {
				d3.select('#tooltip').html('Hover over the heatmap to learn more.')
			})
	}, [])

	// return <svg viewBox="50 10 1000 2000" ref={ svgRef } width={ 1000 } height={ 1200 } />
	return( 
		<>

			<div id="heat" ref={ svgRef }>
			</div>
		</>)
}

export default Chart;