import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon } from 'react-leaflet';
import { sampleDeals } from '../../data/sampleDeals';
import { sydneyZones } from '../../data/sydneyZones';
import 'leaflet/dist/leaflet.css';

const GeoPortfolio: React.FC = () => {
  const center = [-33.8688, 151.2093]; // Sydney CBD coordinates

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
        <div className="h-[600px]">
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Green Zones */}
            {sydneyZones.greenZones.map((coords, idx) => (
              <Polygon
                key={`green-${idx}`}
                positions={coords}
                pathOptions={{
                  fillColor: '#22c55e',
                  fillOpacity: 0.3,
                  weight: 2,
                  opacity: 1,
                  color: '#16a34a'
                }}
              >
                <Popup>Green Zone - Premium Investment Area</Popup>
              </Polygon>
            ))}

            {/* Orange Zones */}
            {sydneyZones.orangeZones.map((coords, idx) => (
              <Polygon
                key={`orange-${idx}`}
                positions={coords}
                pathOptions={{
                  fillColor: '#f97316',
                  fillOpacity: 0.3,
                  weight: 2,
                  opacity: 1,
                  color: '#ea580c'
                }}
              >
                <Popup>Orange Zone - Moderate Risk Area</Popup>
              </Polygon>
            ))}

            {/* Red Zones */}
            {sydneyZones.redZones.map((coords, idx) => (
              <Polygon
                key={`red-${idx}`}
                positions={coords}
                pathOptions={{
                  fillColor: '#ef4444',
                  fillOpacity: 0.3,
                  weight: 2,
                  opacity: 1,
                  color: '#dc2626'
                }}
              >
                <Popup>Red Zone - High Risk Area</Popup>
              </Polygon>
            ))}

            {/* Deal Markers */}
            {sampleDeals.map((deal) => (
              <CircleMarker
                key={deal.id}
                center={[deal.location.latitude, deal.location.longitude]}
                radius={deal.propertyValue / 100000}
                fillColor="#3B82F6"
                color="#2563EB"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-green-700 mb-4">Green Zones</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• North Shore</li>
            <li>• Eastern Suburbs</li>
            <li>• Northern Beaches</li>
            <li>• Lower North Shore</li>
          </ul>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-800">Current Allocation</div>
            <div className="text-2xl font-bold text-green-700">90%</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-orange-700 mb-4">Orange Zones</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Inner West</li>
            <li>• Upper North Shore</li>
            <li>• Southern Sydney</li>
          </ul>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <div className="text-sm font-medium text-orange-800">Current Allocation</div>
            <div className="text-2xl font-bold text-orange-700">10%</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-red-700 mb-4">Red Zones</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Western Sydney</li>
            <li>• South Western Sydney</li>
            <li>• Outer West</li>
          </ul>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <div className="text-sm font-medium text-red-800">Current Allocation</div>
            <div className="text-2xl font-bold text-red-700">0%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoPortfolio;