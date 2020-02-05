// Adapted from "Using the ArcGIS API for JavaScript with React"
// found here: https://developers.arcgis.com/javascript/latest/guide/react/

import React, { useEffect, useRef } from 'react';
import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView';

export const WebMapView = () => {
    const mapRef = useRef();
    
    // create map when component is rendered
    useEffect(
      () => {
        const map = new ArcGISMap({
          basemap: 'topo-vector'
        });
    
        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118, 34],
          zoom: 8
        });

        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
          }
        };
      }
    );

    return <div className="webmap" ref={mapRef} />;
};