// Adapted from ArcGIS tutorials, including:
//  "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/
// and "Draw Graphics" at https://developers.arcgis.com/labs/javascript/draw-graphics/

import React from 'react';
import { loadModules } from 'esri-loader';
// import geometryService from '../scripts/geometryService'

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 
      'esri/views/MapView', 
      'esri/widgets/Search',
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch",
      "esri/geometry/geometryEngine"
        ], { css: true })
    .then(([ArcGISMap, MapView, Search, Graphic, GraphicsLayer, Sketch, geometryEngine]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      let view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-100, 38],
        zoom: 4
      });
      
      // add searchbar 
      let search = new Search({
        view: view
      });
      view.ui.add(search, "top-right");

      // add a graphics layer
      let graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer)

      // Add the Sketch toolbar to draw polygons
      let sketch = new Sketch({
        view: view,
        layer: graphicsLayer
      })

      view.ui.add(sketch, "top-right")

      sketch.on("create", function(event) {
        if (event.state === "complete") {
          let geometry = event.graphic.geometry
          // area in square meters, accounts for curve of Earth
          let area = geometryEngine.geodesicArea(geometry, 109404)
          // let area = geoEngine.geodesicArea(event.graphic.geometry, "square-meters")
          console.log(geometry) 
        }       
      });
      
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
      <div className="webmap esri" ref={this.mapRef} />
    )
  }
}