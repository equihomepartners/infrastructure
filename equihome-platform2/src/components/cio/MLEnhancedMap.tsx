import React, { useState, useCallback, useEffect } from 'react';
import Map, { 
  Source, 
  Layer, 
  NavigationControl,
  CircleLayer,
  Popup
} from 'react-map-gl';
import { trafficLightZones, suburbCoordinates } from '../../data/zoneData';
import { formatNumber } from '../../utils/formatters';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { MapLayerMouseEvent } from 'react-map-gl';

interface Props {
  onSuburbSelect: (suburb: string) => void;
  predictiveMode?: boolean;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXF1aWhvbWVwYXJ0bmVycyIsImEiOiJjbTNzaDVnNnEwZTU0MmpyMGM1MWh0OWJvIn0.4-N9TZtnFGMNF9KYl34o5Q';

const MLEnhancedMap: React.FC<Props> = ({ onSuburbSelect, predictiveMode = false }) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  // Debug logs
  useEffect(() => {
    console.log('Mapbox Token:', MAPBOX_TOKEN);
    console.log('Traffic Light Zones:', trafficLightZones);
    console.log('Suburb Coordinates:', suburbCoordinates);
  }, []);

  // Convert suburbs data to GeoJSON features
  const suburbFeatures = Object.entries(suburbCoordinates as Record<string, [number, number]>).map(([name, coords]: [string, [number, number]]) => {
    const feature = {
      type: 'Feature' as const,
      properties: {
        name,
        zone: trafficLightZones.green.includes(name) ? 'green' :
              trafficLightZones.orange.includes(name) ? 'orange' : 'red'
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [coords[1], coords[0]] // [longitude, latitude]
      }
    };
    console.log('Created feature:', feature);
    return feature;
  });

  console.log('All features:', suburbFeatures);

  // Define growth corridors for predictive mode
  const growthCorridors = [
    {
      name: 'Inner West → Eastern Suburbs',
      color: 'rgba(34, 197, 94, 0.2)', // green with transparency
      coordinates: [
        [-33.9111, 151.1549], // Marrickville
        [-33.8858, 151.2263], // Paddington
        [-33.8764, 151.2432]  // Double Bay
      ]
    },
    {
      name: 'South Sydney → Inner South',
      color: 'rgba(59, 130, 246, 0.2)', // blue with transparency
      coordinates: [
        [-33.9100, 151.1939], // Alexandria
        [-33.9033, 151.2094], // Waterloo
        [-33.9198, 151.2591]  // Coogee
      ]
    }
  ];

  // Define growth corridor analysis
  const corridorAnalysis = {
    'Inner West → Eastern Suburbs': {
      title: 'Inner West to Eastern Suburbs Corridor',
      metrics: {
        transitionProbability: 85,
        timeframe: '12-18 months',
        currentStage: 'Early Transition',
        keySuburbs: ['Marrickville', 'Alexandria', 'Waterloo']
      },
      drivers: [
        'New Metro Line',
        'Commercial Development',
        'Demographic Shift'
      ],
      risks: [
        'Construction Delays',
        'Price Speculation',
        'Development Oversupply'
      ]
    },
    'South Sydney → Inner South': {
      title: 'South Sydney to Inner South Corridor',
      metrics: {
        transitionProbability: 78,
        timeframe: '18-24 months',
        currentStage: 'Planning Phase',
        keySuburbs: ['Mascot', 'Rosebery', 'Eastlakes']
      },
      drivers: [
        'Infrastructure Investment',
        'Employment Growth',
        'Lifestyle Amenities'
      ],
      risks: [
        'Market Timing',
        'Competition for Sites',
        'Planning Changes'
      ]
    }
  };

  // Modify layer style to use circles instead of symbols
  const layerStyle: CircleLayer = {
    id: 'suburbs',
    type: 'circle',
    source: 'suburbs',
    paint: {
      'circle-radius': predictiveMode ? [
        'interpolate',
        ['linear'],
        ['get', 'transitionProbability'],
        0, 10,
        1, 20
      ] : 15,
      'circle-color': predictiveMode ? [
        'interpolate',
        ['linear'],
        ['get', 'transitionProbability'],
        0.3, '#ef4444',
        0.6, '#f97316',
        0.9, '#22c55e'
      ] : [
        'match',
        ['get', 'zone'],
        'green', '#22c55e',
        'orange', '#f97316',
        '#ef4444'
      ],
      'circle-opacity': 0.7,
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 2
    }
  };

  // Add growth corridor layers
  const corridorLayers = predictiveMode ? growthCorridors.map((corridor, index) => ({
    id: `growth-corridor-${index}`,
    type: 'fill',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [corridor.coordinates]
        }
      }
    },
    paint: {
      'fill-color': corridor.color,
      'fill-opacity': 0.5
    }
  })) : [];

  // Add corridor click handler
  const handleCorridorClick = (corridorName: string) => {
    const analysis = corridorAnalysis[corridorName as keyof typeof corridorAnalysis];
    setPopupInfo({
      suburb: analysis.title,
      longitude: 151.2093, // Center coordinates
      latitude: -33.8688,
      isCorridorAnalysis: true,
      analysis
    });
  };

  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      const name = feature.properties?.name as string;
      if (name) {
        const [longitude, latitude] = (feature.geometry as any).coordinates;
        setPopupInfo({
          suburb: name,
          longitude,
          latitude
        });
        onSuburbSelect(name);
      }
    }
  }, [onSuburbSelect]);

  const handleError = (error: any) => {
    console.error('Mapbox error:', error);
  };

  const handleLoad = (event: any) => {
    console.log('Map loaded:', event);
  };

  if (!MAPBOX_TOKEN) {
    console.error('No Mapbox token found');
    return <div>Error: No Mapbox token</div>;
  }

  // Filter suburbs based on search and tab
  const filteredFeatures = suburbFeatures
    .filter(f => 
      f.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTab === 'all' || f.properties.zone === selectedTab)
    );

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search suburbs..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Zone Filter Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTab('green')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'green' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Green
          </button>
          <button
            onClick={() => setSelectedTab('orange')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'orange' 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Orange
          </button>
          <button
            onClick={() => setSelectedTab('red')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'red' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Red
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Suburbs</div>
          <div className="text-2xl font-bold">{filteredFeatures.length}</div>
          <div className="text-xs text-gray-500">Currently visible</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">Zone Distribution</div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1 bg-green-100 rounded h-2" style={{ 
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'green').length / filteredFeatures.length) * 100}%` 
            }} />
            <div className="flex-1 bg-orange-100 rounded h-2" style={{ 
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'orange').length / filteredFeatures.length) * 100}%` 
            }} />
            <div className="flex-1 bg-red-100 rounded h-2" style={{ 
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'red').length / filteredFeatures.length) * 100}%` 
            }} />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">Average Growth</div>
          <div className="text-2xl font-bold text-green-600">+4.2%</div>
          <div className="text-xs text-gray-500">Last 12 months</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">ML Confidence</div>
          <div className="text-2xl font-bold text-blue-600">94.3%</div>
          <div className="text-xs text-gray-500">Based on 1.2M data points</div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[500px] rounded-lg overflow-hidden">
        <Map
          initialViewState={{
            latitude: -33.8688,
            longitude: 151.2093,
            zoom: 11
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['suburbs']}
          onClick={handleClick}
          onError={handleError}
          onLoad={handleLoad}
        >
          {/* Growth Corridor Layers */}
          {predictiveMode && corridorLayers.map((layer, index) => (
            <Source key={layer.id} {...layer.source}>
              <Layer 
                {...layer} 
                onClick={() => handleCorridorClick(growthCorridors[index].name)}
              />
            </Source>
          ))}

          {/* Suburbs Layer */}
          <Source
            id="suburbs"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: filteredFeatures.map(f => ({
                ...f,
                properties: {
                  ...f.properties,
                  transitionProbability: Math.random() // Replace with actual probability
                }
              }))
            }}
          >
            <Layer {...layerStyle} />
          </Source>

          {/* Enhanced Popup */}
          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor="bottom"
              onClose={() => setPopupInfo(null)}
              className="suburb-popup"
            >
              {popupInfo.isCorridorAnalysis ? (
                <div className="p-4 max-w-sm">
                  <h3 className="font-semibold text-lg mb-2">{popupInfo.analysis.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Transition Metrics</div>
                      <div className="text-sm">Probability: {popupInfo.analysis.metrics.transitionProbability}%</div>
                      <div className="text-sm">Timeframe: {popupInfo.analysis.metrics.timeframe}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Key Suburbs</div>
                      <div className="text-sm">{popupInfo.analysis.metrics.keySuburbs.join(', ')}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <h3 className="font-semibold text-lg">{popupInfo.suburb}</h3>
                  <p className="text-sm text-gray-600">
                    {predictiveMode ? 'Click for transition analysis' : 'Click for detailed analysis'}
                  </p>
                </div>
              )}
            </Popup>
          )}

          <NavigationControl position="top-right" />
        </Map>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Green Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm">Orange Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Red Zone</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Click on any suburb for detailed analysis
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLEnhancedMap; 