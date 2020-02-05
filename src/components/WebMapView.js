// Adapted from "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/

import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import useScript from '../hooks/useScript';

export const WebMapView = () => {
  useScript('./scripts/geometryService.js');

  // get a reference to a DOM element created with React component
    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
        .then(([ArcGISMap, MapView]) => {
          const map = new ArcGISMap({
            basemap: 'topo-vector'
          });

          // load the map view at location specified by 'center'
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-100, 38],
            zoom: 4
          });

          return () => {
            if (view) {
              // destroy the map view
              view.container = null;
            }
          };
        });
      }
    );

    return <div className="webmap" ref={mapRef} />;
};