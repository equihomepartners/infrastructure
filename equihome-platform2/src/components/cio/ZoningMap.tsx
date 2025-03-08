import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { trafficLightZones } from '../../data/trafficLightZones';

interface SuburbData {
  name: string;
  coordinates: [number, number];
  zone: 'green' | 'orange' | 'red';
  confidence: number;
}

// Sydney suburbs coordinates (sample data)
const suburbCoordinates: Record<string, [number, number]> = {
  'Mosman': [-33.8269, 151.2466],
  'Double Bay': [-33.8764, 151.2432],
  'Neutral Bay': [-33.8317, 151.2177],
  'Marrickville': [-33.9111, 151.1549],
  'Blacktown': [-33.7668, 150.9054],
  // Add more suburbs with their coordinates
};

const getZoneColor = (zone: string) => {
  switch (zone) {
    case 'green':
      return { color: '#22c55e', fillColor: '#22c55e' };
    case 'orange':
      return { color: '#f97316', fillColor: '#f97316' };
    case 'red':
      return { color: '#ef4444', fillColor: '#ef4444' };
    default:
      return { color: '#gray', fillColor: '#gray' };
  }
};

const ZoningMap: React.FC = () => {
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
        confidence: 75 + Math.random() * 20 // Simulated ML confidence score
      });
    });
    
    return allSuburbs;
  };

  return (
    <MapContainer
      center={[-33.8688, 151.2093]} // Sydney CBD coordinates
      zoom={11}
      style={{ height: '500px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {getSuburbsData().map((suburb) => (
        <CircleMarker
          key={suburb.name}
          center={suburb.coordinates}
          radius={10}
          {...getZoneColor(suburb.zone)}
          fillOpacity={0.6}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{suburb.name}</h3>
              <p className="text-sm">Zone: {suburb.zone.toUpperCase()}</p>
              <p className="text-sm">Confidence: {suburb.confidence.toFixed(1)}%</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default ZoningMap; 