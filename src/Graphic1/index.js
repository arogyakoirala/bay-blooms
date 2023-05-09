import MapSmall from '../MapSmall'
import MapLarge from '../MapLarge'
import data from '../data'

import grassland from './grassland.svg';

const fills = [ '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33' ]
function Header(props) {
	return (
		<div className="row">
			<div className="col-md-2" style={ {visibility: props.progress < 0 ? 'hidden': 'visible'} }>
				<MapSmall icon={ grassland } data={ data.grassland } fill={ fills[ 0 ] } height="100px" title="Grassland" desc="Grasses are the dominant vegetation type. Trees and large shrubs are absent."/>
			</div>
			<div className="col-md-2" style={ {visibility: props.progress < 0 ? 'hidden': 'visible'} }>
				<MapSmall data={ data.coastal } fill={ fills[ 1 ] } height="100px" title="Coastal" desc="Low-growing, aromatic shrubs thrive in high-fog areas."/>
			</div>
			<div className="col-md-2" style={ {visibility: props.progress < 0 ? 'hidden': 'visible'} }>
				<MapSmall data={ data.dunes } fill={ fills[ 2 ] } height="100px" title="Dunes" desc="Densely-packed shrubs interspersed with scattered grasses, wildflowers, & sand."/>
			</div>
			<div className="col-md-2" style={ {visibility: props.progress < 0 ? 'hidden': 'visible'} }>
				<MapSmall data={ data.riparian } fill={ fills[ 3 ] } height="100px" title="Riparian" desc="Found along streams and rivers and are generally more water-thirsty. "/>
			</div>
			<div className="col-md-2" style={ {visibility: props.progress < 0 ? 'hidden': 'visible'} }>
				<MapSmall data={ data.wetland } fill={ fills[ 4 ] } height="100px" title="Wetland" desc="Produces high levels of oxygen, filters chemicals, and reduces flooding & erosion."/>
			</div>
			<div className="col-md-2" style={ {visibility: props.progress < 0 ? 'hidden': 'visible'} }>
				<MapSmall data={ data.woodland } fill={ fills[ 5 ] } height="100px" title="Woodland" desc="Provides a sheltered environment for many shade-tolerant species. "/>
			</div>

			<div className='col-md-12 pt-3'>
				<MapLarge currentStepIndex={ props.currentStepIndex }/>
			</div>
		</div>
	)
}

export default Header