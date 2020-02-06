// Adapted from "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/

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
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Search', 'dojo/_base/lang', 'esri/toolbars/draw', 'esri/graphic',
    'esri/tasks/GeometryService',
    'esri/tasks/AreasAndLengthsParameters',
    'esri/symbols/SimpleFillSymbol',
    'dojo/dom',
    'dojo/json' ], { css: true })
    .then(([ArcGISMap, MapView, Search, lang, Draw, Graphic, GeometryService, AreasAndLengthsParameters, SimpleFillSymbol, dom, json]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });

      let view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8
      });
      
      // add searchbar 
      let search = new Search({
        view: view
      });
      view.ui.add(search, "top-right");

      let draw = new Draw(map);
      draw.on("draw-end", lang.hitch(map, getAreaAndLength));
      draw.activate(Draw.FREEHAND_POLYGON);

      function outputAreaAndLength(evtObj) {
        let result = evtObj.result;
        console.log(json.stringify(result));
        dom.byId("area").innerHTML = result.areas[0].toFixed(3) + " acres";
        dom.byId("length").innerHTML = result.lengths[0].toFixed(3) + " feet";
      }
      
      function getAreaAndLength(evtObj) {
        let geometry = evtObj.geometry;
        map.graphics.clear();
        
        let graphic = map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));
        
        //setup the parameters for the areas and lengths operation
        let geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        geometryService.on("areas-and-lengths-complete", outputAreaAndLength);

        const areasAndLengthParams = new AreasAndLengthsParameters();
        areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
        areasAndLengthParams.areaUnit = GeometryService.UNIT_ACRES;
        areasAndLengthParams.calculationType = "geodesic";
        geometryService.simplify([geometry], function(simplifiedGeometries) {
          areasAndLengthParams.polygons = simplifiedGeometries;
          geometryService.areasAndLengths(areasAndLengthParams);
        });
      }
      
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