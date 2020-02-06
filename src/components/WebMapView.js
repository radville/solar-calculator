// Adapted from "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/

import React from 'react';
import { loadModules } from 'esri-loader';
// import geometryService from '../scripts/geometryService'

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {stylePath: 'https://js.arcgis.com/3.31/esri/css/esri.css'};
  }

  componentDidMount() {

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Search' ], { css: true })
    .then(([ArcGISMap, MapView, Search]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      let view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8
      });

      let search = new Search({
        view: view
      });

      view.ui.add(search, "top-right");
      
    });
  }


  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} />
    )
  }
}