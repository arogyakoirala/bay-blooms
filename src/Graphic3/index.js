import React, {useState, useEffect} from 'react';
import Chart from './Chart';
import Data from './data';
// import Adjacency from './Chart'

const Graphic3 = () => {
	// const [ loading, setLoading ] =  useState(false)
	// const [ error, setError ] =  useState(null)
	// const [ data, setData ] =  useState(null)

	// useEffect(()=>{
	// 	if( data== null){
	// 		fetch('http://localhost:5000/get-json?water_moderate&type=Tree')
	// 			.then(response=> {
	// 				if(response.ok) {
	// 					return response.json()
	// 				}
	// 				throw response
	// 			}).then(d => {
	// 				setData(d);
	// 			}).catch(e => {
	// 				setError(e)
	// 			}).finally(()=>{
	// 				setLoading(false)
	// 			})}
	// })
	return (

		<>
			<Chart data={ {data: Data.distances, native_labels: Data.nativeLabels, properties: Data.properties} }/>
        
		</>
	)
}

export default Graphic3