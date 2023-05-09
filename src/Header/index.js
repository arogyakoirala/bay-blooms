import './style.css';
import logo from './logo.png'

function Header() {
	return (
		<div className=" bg-image header" style={ { height: '100vh', backgroundSize: 'cover', backgroundImage: "url('https://raw.githubusercontent.com/arogyakoirala/bucket/master/bg_25.png')" } }>
			<div className="mask p-5  text-center" style={ { backgroundColor: 'rgba(0, 0, 0, 0.8)', minHeight:'100vh', } }>
				{/* <div className="container">
					<div className="row p-4">
						<div className="col-md-7 "> */}
				<img alt = "bayblooms" style={ {maxWidth: '500px', marginTop: '20vh'} }src = { logo } className="img-fluid"/>
				
				<div className="row">
					<div className="col-md-8 offset-2">

						<p className="intro-text pt-5">Bay Blooms aims to help gardening enthusiasts make informed decisions about their gardening choices. Our goal is to increase awareness about native and exotic plant species in San Francisco, with the hope of inspiring individuals to conserve, protect, and promote the planting of more native plants in the Bay Area.</p>
						<br/>
						<small><p className="authors">Arogya Koirala, Marissa Khoury, Kendra Moore</p></small>
						<p className="scroll-text">Scroll ↓</p>
					</div>

				</div>
				{/* </div>
					</div>

				</div> */}
			</div>
		</div>
	)
}

export default Header