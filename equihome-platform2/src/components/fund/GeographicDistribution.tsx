import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { chartColors } from './chartConstants';
import { sampleDeals } from '../../data/sampleDeals';
import 'leaflet/dist/leaflet.css';

const GeographicDistribution: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const center: LatLngTuple = [-33.8688, 151.2093]; // Sydney CBD coordinates

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[400px] bg-gray-100 rounded-lg animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Geographic Distribution</h3>
      <div className="h-[400px]">
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sampleDeals.map((deal) => (
            <CircleMarker
              key={deal.id}
              center={[deal.location.latitude, deal.location.longitude]}
              radius={deal.propertyValue / 100000}
              fillColor={chartColors.mapColors.marker}
              color={chartColors.mapColors.markerBorder}
              weight={1}
              opacity={0.8}
              fillOpacity={0.4}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{deal.suburb}</h4>
                  <p className="text-sm text-gray-600">${deal.propertyValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">LTV: {deal.ltv.toFixed(2)}%</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">
        Portfolio distribution across Sydney metropolitan area
      </div>
    </div>
  );
};

export default GeographicDistribution;