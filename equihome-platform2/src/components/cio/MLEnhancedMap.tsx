import React, { useState, useCallback } from 'react';
import Map, { 
  Source, 
  Layer, 
  NavigationControl,
  Popup
} from 'react-map-gl';
import { trafficLightZones } from '../../data/zoneData';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  onSuburbSelect?: (suburb: string) => void;
  predictiveMode?: boolean;
}

// Get Mapbox token from import.meta.env (Vite's way of accessing env variables)
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Mock data for initial display
const mockZones = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Mosman",
        "zone": "green"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [151.2466, -33.8269],
          [151.2506, -33.8289],
          [151.2536, -33.8309],
          [151.2556, -33.8329],
          [151.2536, -33.8349],
          [151.2506, -33.8369],
          [151.2466, -33.8349],
          [151.2436, -33.8329],
          [151.2466, -33.8269]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Double Bay",
        "zone": "green"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [151.2432, -33.8764],
          [151.2472, -33.8784],
          [151.2492, -33.8804],
          [151.2472, -33.8824],
          [151.2452, -33.8844],
          [151.2432, -33.8824],
          [151.2412, -33.8804],
          [151.2432, -33.8764]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Marrickville",
        "zone": "orange"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [151.1549, -33.9111],
          [151.1589, -33.9131],
          [151.1609, -33.9151],
          [151.1589, -33.9171],
          [151.1569, -33.9191],
          [151.1549, -33.9171],
          [151.1529, -33.9151],
          [151.1549, -33.9111]
        ]]
      }
    }
  ]
};

const MLEnhancedMap: React.FC<Props> = ({ onSuburbSelect, predictiveMode = true }) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);

  const fillLayerStyle = {
    id: 'suburb-fills',
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'zone'],
        'green', '#22c55e',
        'orange', '#f97316',
        '#ef4444'
      ],
      'fill-opacity': 0.5
    }
  };

  const lineLayerStyle = {
    id: 'suburb-borders',
    type: 'line',
    paint: {
      'line-color': '#ffffff',
      'line-width': 1
    }
  };

  const onClick = useCallback((event: any) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      const name = feature.properties?.name;
      if (name) {
        setPopupInfo({
          suburb: name,
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          zone: feature.properties.zone
        });
        onSuburbSelect?.(name);
      }
    }
  }, [onSuburbSelect]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: -33.8688,
          longitude: 151.2093,
          zoom: 11
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        interactiveLayerIds={['suburb-fills']}
        onClick={onClick}
      >
        <NavigationControl position="top-right" />
        
        <Source type="geojson" data={mockZones}>
          <Layer {...fillLayerStyle as any} />
          <Layer {...lineLayerStyle as any} />
        </Source>

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
          >
            <div className="p-2">
              <h3 className="font-semibold">{popupInfo.suburb}</h3>
              <p className={`text-sm ${
                popupInfo.zone === 'green' ? 'text-green-600' :
                popupInfo.zone === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {popupInfo.zone.toUpperCase()} Zone
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MLEnhancedMap; 