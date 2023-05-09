import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Infographic from './Infographic.png'
import { Scrollama, Step } from 'react-scrollama';
import Graphic1 from './Graphic1';
import Graphic3 from './Graphic3';
import Header from './Header';
import data from './data'
function App() {

	const [ currentStepIndex, setCurrentStepIndex ] = useState(0);
	const [ progress, setProgress ] = useState(0);
	// This callback fires when a Step hits the offset threshold. It receives the
	// data prop of the step, which in this demo stores the index of the step.
	const onStepEnter = ({ data }) => {
		setCurrentStepIndex(data);
	};

	const onStepExit = ({ data }) => {
		// setCurrentStepIndex(data);
	};

	const onStepProgress = ({ progress }) => {
		// setCurrentStepIndex(data);  onStepProgress = ({ progress }) => {
		setProgress(progress)

	};

	const [ isVisible, setIsVisible ] = useState(true);
	const listenToScroll = () => {
		const heightToHideFrom = 1000;
		const winScroll = document.body.scrollTop ||
			document.documentElement.scrollTop;
	  
		if (winScroll > heightToHideFrom) {
		   isVisible &&      // to limit setting state only the first time
			 setIsVisible(false);
		} else {
			 setIsVisible(true);
		}
	  };

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const heightToHideFrom = 8900;
			const winScroll = document.body.scrollTop ||
				document.documentElement.scrollTop;
		  
			if (winScroll > heightToHideFrom) {
			   isVisible &&      // to limit setting state only the first time
				 setIsVisible(false);
			} else {
				 setIsVisible(true);
			}
		  });
		return () =>
		   window.removeEventListener('scroll', () => {
				const heightToHideFrom = 8900;
				const winScroll = document.body.scrollTop ||
				document.documentElement.scrollTop;
		  
				if (winScroll > heightToHideFrom) {
			   isVisible &&      // to limit setting state only the first time
				 setIsVisible(false);
				} else {
				 setIsVisible(true);
				}
		  });
	  })

	return (
		<div>
			<Header></Header>

			<div className="graphic-container">

				<div className="scroller">
					<Scrollama
						onStepEnter={ onStepEnter }
						onStepExit={ onStepExit }
						progress
						onStepProgress={ onStepProgress }
						offset="600px"
						//   debug
					>
						<Step data={ 0 } value={ 0 }>
							<div className="test" style={ { padding: '30vh 0 70vh', visibility: currentStepIndex===0 ? 'visible': 'hidden', paddingBottom:'50vh'}  }>
								<h2 className="mb-4">San Francisco Plant Communities</h2>
								<p>San Francisco, only seven square miles, has many microclimates within its city limits. With a rare Mediterranean climate and varied topography, the Bay Area is one of the most unique ecosystems in the world. 
								</p>
								<p>San Francisco supports many different <strong>plant communities</strong> within a relatively small geographic area. 
								</p>
								<p>A <strong>plant community</strong> is an assemblage of plant, animal, and fungi species that have co-evolved within a specific geographic area over time. The characteristics of every plant community are influenced by the physical environment-- including topography, geology, and microclimate. 
								</p>
								<p className="text-muted" style={ {fontSize: '0.8rem'} } >Samll maps on the right show the distribution of different plant community zones in San Francisco. The large map shows how these zones overlap.</p>
								<p style={ {fontSize: '0.8rem'} } className="scroll-text">Keep scrolling ↓</p>

							</div>
						</Step>
						<Step data={ 1 } value={ 1 }>
							<div className="test"  style = { { padding: '0vh 0 0vh', visibility: currentStepIndex===1 ? 'visible': 'hidden', transition: '0.2s ease'} }>
								<h4>Exploring San Francisco's exotic and native plant species</h4>
								<p>San Francisco is home to many plants, both native to the area, and exotic. Native plants are indigenous to California and are native to San Francisco. Exotic plants are not indigenous to California. They may be from the eastern United States or anywhere else on Earth.</p>
                    
								<div style={ {fontSize: '0.8rem'} }>
									<p>
										<strong>Annuals:</strong> Annuals are plants that perform their entire life cycle from seed to flower to seed again within a single year. In other words, all roots, stems, and leaves of the plant die annually. 
									</p>
									<p>
										<strong>Perennials:</strong>  Perennials refer to plants that live for more than one or two growing seasons. 
									</p>
									<p>
										<strong>Evergreen:</strong>  Evergreens are plants which retain their foliage in all seasons and are green all year round.
									</p>
									<p>
										<strong>Deciduous:</strong>  Deciduous plants shed their foliage annually, at the end of the growing season.
									</p>

								</div>

								<p className="text-muted" style={ {fontSize:'0.8rem'} }>
                          Chart on the right visualizes different type of plants that can be found in San Francisco. Data: <a href="#">SF Plant Finder</a> 
								</p>
								<p style={ {fontSize: '0.8rem'} } className="scroll-text">Keep scrolling ↓</p>
								
							</div>
						</Step>
					</Scrollama>
				</div>
				{currentStepIndex===0 && <div className="graphic" style={ {opacity: progress < 0.45 ? progress: progress > 0.8 ? 1-progress: 1} }>
					<Graphic1 progress={ progress } currentStepIndex={ currentStepIndex }/>
				</div>}

				{currentStepIndex===1 && <div className="graphic" style={ {opacity: progress < 0.25 ? progress: progress > 0.9 ? 1-progress: 1} }>
					<div style={ {width: '900px', paddingLeft: '7vw'} }>  
						{/* https://public.tableau.com/views/plants_16835718590190/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link */}
						{/* <tableau-viz id="tableauViz"  src=" https://public.tableau.com/views/plants_16835718590190/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"  toolbar="bottom" hide-tabs>  
						</tableau-viz> */}

						<iframe width="100%" height="602" frameborder="0"
							src="https://observablehq.com/embed/fce07755982f8df0@530?cells=viewof+choice%2Cb"></iframe>
					</div>
				</div>}

				{(currentStepIndex===2 || currentStepIndex===3) && <div className="graphic" style={ {opacity: 1} }>
					{/* <Graphic3/> */}

				</div>}
			</div>
      
			<div className=" text-center" style={ {backgroundColor: '#f2f2f2'} }>
				<div className="row" style={ {padding: '40vh 0'} }>
					<div className="col-md-8 offset-md-2 mb-5">

						<h3>Some benefits of native plants</h3>
						<br/>
						<br/>
						<img className="img-fluid" src={ Infographic } alt="benefits"></img>
						<br/>
						<br/>
						<div></div>
						<p className="text-muted">Data Source: <a href="https://scholarworks.umass.edu/eco_ed_materials/8/">ScholarWorks@UMassAmherst</a></p>
					</div>
				</div>
			</div>
			<div className="bottom text-center">
				
				<div className="row">
					<div className="col-md-6 offset-md-3 mb-5">

						<h1>Explore Thrifty 150 native alternatives to exotic plants</h1>
						<br/>
						<p style={ {fontSize: '1.4rem'} }>Want to switch to native plants, but don't know how? Use this interactive tool below to identify native alternatives to all exotic plants found in California.</p>
						<p>San Francisco Public Works maintains a database of durable, low maintenance, water wise plants that are very suited for the microclimatic conditions in the city. We went ahead and calculated cosine similarities between every exotic plant and the native plants that fall in the Thrifty 150 list. The result, is an easy to use tool that can quickly help you identify alternative native plants based on your needs.</p>
					</div>
				</div>
        					<Graphic3/>
				{isVisible && <div id="tooltip" style={ {width: '50%', opacity: 1,   margin:'0 auto', padding: 20, border: '1px solid black', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', position: 'sticky', bottom:'50px'} }>
                Hover over the heat map to learn more
				</div>}
				
			</div>
			<div className="text-center" style={ {padding: '30vh 0',  backgroundColor: '#eff7f0'} }>
				<div className="row" >
					<div className="col-md-8 offset-md-2 mb-5">
						<h2>Take our poll</h2>
						<p>Please help us by answering the following question</p>
						<br/>
						<br/>
		
						<div class="strawpoll-embed" id="strawpoll_BJnX81keYnv" style={ {height: '516px', maxWidth: '640px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column'} }><iframe title="StrawPoll Embed" id="strawpoll_iframe_BJnX81keYnv" src="https://strawpoll.com/embed/polls/BJnX81keYnv" style={ {position: 'static', visibility: 'visible', display: 'block', width: '100%', flexGrow: 1} } frameborder="0" allowfullscreen allowtransparency>Loading...</iframe><script async src="https://cdn.strawpoll.com/dist/widgets.js" charset="utf-8"></script></div>
					</div>
				</div>

			</div>

			<div className="text-center" style={ {padding: '18vh 0', backgroundColor: '#4fa060', color: '#fff'} }>

				<div className="row" >
					<div className="col-md-6 offset-md-3 mb-5">
						<h1>Thank you for visiting</h1>
						<p style={ {fontSize: '1rem'} }>Bay Blooms is a project created by students from UC Berkeley Master of Information Management and Systems in 2023. </p>

					</div>
				</div>
			</div>

			{/* <Scrollama offset={ 0.5 } onStepEnter={ onStepEnter } debug>
        {[ 1, 2, 3, 4 ].map((_, stepIndex) => (
          <Step data={ stepIndex } key={ stepIndex }>
            <div
              style={ {
                margin: '50vh 0',
                border: '1px solid gray',
                opacity: currentStepIndex === stepIndex ? 1 : 0.2,
              } }
            >
              I'm a Scrollama Step of index {stepIndex}
            </div>
          </Step>
        ))}
      </Scrollama> */}
		</div>
	);
}

export default App;
