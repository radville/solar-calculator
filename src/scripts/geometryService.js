// Adapted from "Geometry Service - Calculate geometry"
// at https://developers.arcgis.com/javascript/3/jssamples/util_measurepoly.html
import React from 'react';

export function geometryService(map) {
    console.log("here")

    loadModules(["dojo/dom",
          "dojo/_base/lang",
          "dojo/json",
          "esri/config",
          "esri/map",
          "esri/graphic",
          "esri/geometry/Geometry",
          "esri/geometry/Extent",
          "esri/SpatialReference",
          "esri/tasks/GeometryService",
          "esri/tasks/AreasAndLengthsParameters",
          "esri/toolbars/draw",
          "esri/symbols/SimpleFillSymbol"]
          .then(([dom, lang, json, esriConfig, Map, Graphic, Geometry, Extent, 
            SpatialReference, GeometryService, AreasAndLengthsParameters, Draw, 
            SimpleFillSymbol]) => {

      //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
      //If this null or not available the project and lengths operation will not work.  Otherwise it will do a http post to the proxy.
      esriConfig.defaults.io.proxyUrl = "/proxy/";
      esriConfig.defaults.io.alwaysUseProxy = false;

      map.on("load", function() {
        var tb = new Draw(map);
        tb.on("draw-end", lang.hitch(map, getAreaAndLength));
        tb.activate(Draw.FREEHAND_POLYGON);
      });
      
      var geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      geometryService.on("areas-and-lengths-complete", outputAreaAndLength);

    function getAreaAndLength(evtObj) {
      var map = this,
          geometry = evtObj.geometry;
      map.graphics.clear();
      
      var graphic = map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));
      
      //setup the parameters for the areas and lengths operation
      var areasAndLengthParams = new AreasAndLengthsParameters();
      areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
      areasAndLengthParams.areaUnit = GeometryService.UNIT_ACRES;
      areasAndLengthParams.calculationType = "geodesic";
      geometryService.simplify([geometry], function(simplifiedGeometries) {
        areasAndLengthParams.polygons = simplifiedGeometries;
        geometryService.areasAndLengths(areasAndLengthParams);
      });
    }

    function outputAreaAndLength(evtObj) {
      var result = evtObj.result;
      console.log(json.stringify(result));
      dom.byId("area").innerHTML = result.areas[0].toFixed(3) + " acres";
      dom.byId("length").innerHTML = result.lengths[0].toFixed(3) + " feet";
    }
  })
//   return <div>here</div>
},

export default geometryService;