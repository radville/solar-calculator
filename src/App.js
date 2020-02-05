import React from 'react';
import './App.css';
import { WebMapView } from './components/WebMapView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Solar Calculator</h1>
      </header>

      <WebMapView />
      <div id="mapDiv"></div>
      <div id="info" className="esriSimpleSlider">
        Draw a polygon where you would like your solar installation to calculate the nominal power.
        <br /><br />
        <span className="label">Area:</span> <span id="area"></span>
        <br />
        <span className="label">Nominal Power:</span> <span id="power"></span>
      </div>
    </div>
  );
}

export default App;
