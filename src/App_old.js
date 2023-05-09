import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header'

function App() {
  return (
      <div className="App">

          <div className="container">
              <div className="row">
                  <div className="col-md-6 p-5">
                      <h1 className="mt-5">
                          Exploring San Francisco's exotic and native plant distributions
                      </h1>
                      
                      <p>
                          Chart on the right visualizes different type of plants that can be found in San Francisco. We used openly available data from <a href="#">Plant Finder</a> to visualize the variety in plants that can be grown in the region. 
                      </p>
                  </div>
                  <div className="col-md-6 p-3">

                      <iframe width="100%" height="727" frameborder="0"
  src="https://observablehq.com/embed/fcbe9be577a19be0@1548?cells=viewof+column%2Ca"></iframe>
                  </div>
              </div>
          </div>
          
      </div>
  );
}

export default App;
