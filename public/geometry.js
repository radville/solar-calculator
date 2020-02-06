require(["dojo/dom",
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
        "esri/symbols/SimpleFillSymbol"],
      function(dom, lang, json, esriConfig, Map, Graphic, Geometry, 
        Extent, SpatialReference, GeometryService, AreasAndLengthsParameters, Draw, SimpleFillSymbol){

      //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
      //If this null or not available the project and lengths operation will not work.  Otherwise it will do a http post to the proxy.
      esriConfig.defaults.io.proxyUrl = "/proxy/";
      esriConfig.defaults.io.alwaysUseProxy = false;

      let map = new Map("mapDiv", {
        basemap: "topo",
        center: [-118, 34],
        zoom: 8
      });
      
      map.on("load", function() {
        var tb = new Draw(map);
        tb.on("draw-end", lang.hitch(map, getAreaAndLength));
        tb.activate(Draw.FREEHAND_POLYGON);
      });
      
      let geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      geometryService.on("areas-and-lengths-complete", outputAreaAndPower);

      function getAreaAndLength(evtObj) {
        let map = this,
            geometry = evtObj.geometry;
        map.graphics.clear();
        
        let graphic = map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));
        
        //setup the parameters for the area and power calculation
        var areasAndLengthParams = new AreasAndLengthsParameters();
        areasAndLengthParams.lengthUnit = GeometryService.UNIT_METER;
        areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
        areasAndLengthParams.calculationType = "geodesic";
        geometryService.simplify([geometry], function(simplifiedGeometries) {
          areasAndLengthParams.polygons = simplifiedGeometries;
          geometryService.areasAndLengths(areasAndLengthParams);
        });
    }

    function outputAreaAndPower(evtObj) {
      var result = evtObj.result;
      // area of polygon selected by user
      dom.byId("area").innerHTML = result.areas[0].toFixed(0) + " m" + "2".sup();

      // from https://photovoltaic-software.com/principle-ressources/how-calculate-solar-energy-power-pv-systems
      // Nominal power = A * r * H * PR, where A = total solar panel area, r = solar panel efficiency,
      // H = annual average solar radtion on tilted panels, and PR = performance ratio, coefficient for losses
      // Assumptions: standard test conditions (STC): radiation=1000 W/m2, cell temperature=25C, Wind speed=1 m/s, AM=1.5
      //              r = 15%, H = 1250 kWh/m^2*year, PR = 0.75
      dom.byId("power").innerHTML = (result.areas[0] * 0.15 * 1250 * 0.75).toFixed(0) + " kWh/year";
    }
    });