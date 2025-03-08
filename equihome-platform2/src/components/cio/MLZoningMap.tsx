import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { trafficLightZones } from '../../data/trafficLightZones';

interface SuburbData {
  name: string;
  coordinates: [number, number];
  zone: 'green' | 'orange' | 'red';
  confidence: number;
  metrics: {
    growth: number;
    risk: number;
    infrastructure: number;
    development: string;
    transport: number;
    schools: number;
  };
  predictions: {
    threeMonth: string;
    sixMonth: string;
    twelveMonth: string;
  };
}

// Extended Sydney suburbs coordinates with ML data
const suburbCoordinates: Record<string, [number, number]> = {
  'Mosman': [-33.8269, 151.2466],
  'Double Bay': [-33.8764, 151.2432],
  'Neutral Bay': [-33.8317, 151.2177],
  'Cremorne': [-33.8284, 151.2275],
  'Bronte': [-33.9033, 151.2647],
  'Marrickville': [-33.9111, 151.1549],
  'Ashfield': [-33.8932, 151.1244],
  'Burwood': [-33.8774, 151.1037],
  'Strathfield': [-33.8791, 151.0824],
  'Chatswood': [-33.7969, 151.1803],
  'Blacktown': [-33.7668, 150.9054],
  'Mount Druitt': [-33.7729, 150.8185],
  'Penrith': [-33.7511, 150.6942],
  'Liverpool': [-33.9200, 150.9238],
  // Add more suburbs with coordinates
};

const MLZoningMap: React.FC = () => {
  const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

  const getZoneStyle = (zone: string) => {
    const baseStyle = { weight: 1, opacity: 1, fillOpacity: 0.6 };
    switch (zone) {
      case 'green':
        return { ...baseStyle, color: '#22c55e', fillColor: '#22c55e' };
      case 'orange':
        return { ...baseStyle, color: '#f97316', fillColor: '#f97316' };
      case 'red':
        return { ...baseStyle, color: '#ef4444', fillColor: '#ef4444' };
      default:
        return { ...baseStyle, color: '#gray', fillColor: '#gray' };
    }
  };

  const getMLMetrics = (suburb: string): SuburbData['metrics'] => {
    // Simulated ML-generated metrics
    return {
      growth: 5 + Math.random() * 10,
      risk: Math.random() * 100,
      infrastructure: 60 + Math.random() * 40,
      development: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      transport: 70 + Math.random() * 30,
      schools: 75 + Math.random() * 25
    };
  };

  const getPredictions = (suburb: string): SuburbData['predictions'] => {
    // Simulated ML predictions
    const trends = ['Strong Growth', 'Moderate Growth', 'Stable', 'Slight Decline'];
    return {
      threeMonth: trends[Math.floor(Math.random() * trends.length)],
      sixMonth: trends[Math.floor(Math.random() * trends.length)],
      twelveMonth: trends[Math.floor(Math.random() * trends.length)]
    };
  };

  const getSuburbsData = (): SuburbData[] => {
    const allSuburbs: SuburbData[] = [];
    
    Object.entries(suburbCoordinates).forEach(([name, coordinates]) => {
      let zone: 'green' | 'orange' | 'red';
      if (trafficLightZones.green.includes(name)) {
        zone = 'green';
      } else if (trafficLightZones.orange.includes(name)) {
        zone = 'orange';
      } else {
        zone = 'red';
      }
      
      allSuburbs.push({
        name,
        coordinates,
        zone,
        confidence: 75 + Math.random() * 20,
        metrics: getMLMetrics(name),
        predictions: getPredictions(name)
      });
    });
    
    return allSuburbs;
  };

  return (
    <div className="space-y-4">
      <MapContainer
        center={[-33.8688, 151.2093]}
        zoom={11}
        style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {getSuburbsData().map((suburb) => (
          <CircleMarker
            key={suburb.name}
            center={suburb.coordinates}
            radius={12}
            {...getZoneStyle(suburb.zone)}
            eventHandlers={{
              click: () => setSelectedSuburb(suburb.name)
            }}
          >
            <Tooltip permanent>
              <div className="text-xs font-semibold">{suburb.name}</div>
            </Tooltip>
            <Popup>
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-lg">{suburb.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Zone Rating</p>
                    <p className={`font-medium ${
                      suburb.zone === 'green' ? 'text-green-600' : 
                      suburb.zone === 'orange' ? 'text-orange-600' : 
                      'text-red-600'
                    }`}>
                      {suburb.zone.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">ML Confidence</p>
                    <p className="font-medium">{suburb.confidence.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Growth Potential</p>
                    <p className="font-medium text-green-600">
                      {suburb.metrics.growth.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Risk Score</p>
                    <p className="font-medium">
                      {suburb.metrics.risk.toFixed(0)}/100
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600 text-sm">ML Predictions</p>
                  <div className="text-sm space-y-1">
                    <p>3M: {suburb.predictions.threeMonth}</p>
                    <p>6M: {suburb.predictions.sixMonth}</p>
                    <p>12M: {suburb.predictions.twelveMonth}</p>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {selectedSuburb && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Selected Area Analysis</h3>
          {/* Add detailed ML analysis for selected suburb */}
        </div>
      )}
    </div>
  );
};

export default MLZoningMap; 