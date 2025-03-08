import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { trafficLightZones } from '../../data/trafficLightZones';

interface Props {
  onSuburbSelect: (suburb: string) => void;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDJhE5B8nPz1FLG4RrRl2cA-Ni70zuEVCw';

// Define more accurate suburb boundaries
const suburbPolygons = {
  // North Shore (Green Zone)
  'Mosman': [
    { lat: -33.8269, lng: 151.2466 },
    { lat: -33.8289, lng: 151.2506 },
    { lat: -33.8309, lng: 151.2536 },
    { lat: -33.8329, lng: 151.2556 },
    { lat: -33.8349, lng: 151.2536 },
    { lat: -33.8369, lng: 151.2506 },
    { lat: -33.8349, lng: 151.2466 },
    { lat: -33.8329, lng: 151.2436 },
    { lat: -33.8269, lng: 151.2466 }
  ],
  'Cremorne': [
    { lat: -33.8284, lng: 151.2275 },
    { lat: -33.8304, lng: 151.2315 },
    { lat: -33.8324, lng: 151.2335 },
    { lat: -33.8344, lng: 151.2315 },
    { lat: -33.8364, lng: 151.2295 },
    { lat: -33.8344, lng: 151.2275 },
    { lat: -33.8324, lng: 151.2255 },
    { lat: -33.8284, lng: 151.2275 }
  ],
  // Eastern Suburbs (Green Zone)
  'Double Bay': [
    { lat: -33.8764, lng: 151.2432 },
    { lat: -33.8784, lng: 151.2472 },
    { lat: -33.8804, lng: 151.2492 },
    { lat: -33.8824, lng: 151.2472 },
    { lat: -33.8844, lng: 151.2452 },
    { lat: -33.8824, lng: 151.2432 },
    { lat: -33.8804, lng: 151.2412 },
    { lat: -33.8764, lng: 151.2432 }
  ],
  // Inner West (Orange Zone)
  'Marrickville': [
    { lat: -33.9111, lng: 151.1549 },
    { lat: -33.9131, lng: 151.1589 },
    { lat: -33.9151, lng: 151.1609 },
    { lat: -33.9171, lng: 151.1589 },
    { lat: -33.9191, lng: 151.1569 },
    { lat: -33.9171, lng: 151.1549 },
    { lat: -33.9151, lng: 151.1529 },
    { lat: -33.9111, lng: 151.1549 }
  ]
};

const GoogleMLMap: React.FC<Props> = ({ onSuburbSelect }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

  useEffect(() => {
    if (!map) return;

    // Clear existing polygons
    polygons.forEach(polygon => polygon.setMap(null));
    setPolygons([]);

    // Create new polygons
    const newPolygons = Object.entries(suburbPolygons).map(([suburb, paths]) => {
      let zoneColor = '#ef4444'; // Default red
      if (trafficLightZones.green.includes(suburb)) {
        zoneColor = '#22c55e';
      } else if (trafficLightZones.orange.includes(suburb)) {
        zoneColor = '#f97316';
      }

      const polygon = new google.maps.Polygon({
        paths,
        strokeColor: '#FFFFFF',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: zoneColor,
        fillOpacity: selectedSuburb === suburb ? 0.8 : 0.6,
        map
      });

      // Add click listener
      polygon.addListener('click', () => {
        setSelectedSuburb(suburb);
        onSuburbSelect(suburb);
      });

      // Add hover effects
      polygon.addListener('mouseover', () => {
        polygon.setOptions({ fillOpacity: 0.8 });
      });

      polygon.addListener('mouseout', () => {
        polygon.setOptions({ 
          fillOpacity: selectedSuburb === suburb ? 0.8 : 0.6 
        });
      });

      return polygon;
    });

    setPolygons(newPolygons);
  }, [map, selectedSuburb]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '600px',
          borderRadius: '0.5rem'
        }}
        center={{ lat: -33.8688, lng: 151.2093 }}
        zoom={12}
        onLoad={setMap}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#c9e9f6' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }]
            }
          ]
        }}
      />
    </LoadScript>
  );
};

export default GoogleMLMap; 