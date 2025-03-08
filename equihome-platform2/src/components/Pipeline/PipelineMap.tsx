import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { pipelineDeals } from '../../data/pipelineData';
import 'leaflet/dist/leaflet.css';

const PipelineMap: React.FC = () => {
  const center = [-33.8688, 151.2093]; // Sydney CBD coordinates

  // Calculate metrics for the legend
  const metrics = {
    totalDeals: pipelineDeals.length,
    highQuality: pipelineDeals.filter(deal => deal.underwriteScore >= 80).length,
    mediumQuality: pipelineDeals.filter(deal => deal.underwriteScore >= 60 && deal.underwriteScore < 80).length,
    lowQuality: pipelineDeals.filter(deal => deal.underwriteScore < 60).length,
    totalVolume: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.amount, 0)
  };

  const getMarkerColor = (score: number) => {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  // Calculate the radius based on property value with increased base size
  const getRadius = (value: number) => {
    // Increase the base size by adjusting the divisor and adding a minimum size
    return Math.max(15, Math.sqrt(value / 50000)); // Adjusted for better visibility
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Deals</div>
            <div className="text-xl font-semibold">{metrics.totalDeals}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">High Quality</div>
            <div className="text-xl font-semibold text-green-600">{metrics.highQuality}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Medium Quality</div>
            <div className="text-xl font-semibold text-yellow-600">{metrics.mediumQuality}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Volume</div>
            <div className="text-xl font-semibold">${(metrics.totalVolume / 1000000).toFixed(1)}M</div>
          </div>
        </div>

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

            {/* Deal Markers */}
            {pipelineDeals.map((deal) => (
              <CircleMarker
                key={deal.id}
                center={[deal.propertyDetails.latitude, deal.propertyDetails.longitude]}
                radius={getRadius(deal.propertyDetails.currentValue)}
                fillColor={getMarkerColor(deal.underwriteScore)}
                color={getMarkerColor(deal.underwriteScore)}
                weight={2}
                opacity={1}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold">{deal.propertyDetails.address}</h4>
                    <p className="text-sm text-gray-600">
                      Value: ${(deal.propertyDetails.currentValue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-gray-600">
                      Loan: ${(deal.loanRequest.amount / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-gray-600">
                      Score: {deal.underwriteScore}
                    </p>
                    <p className="text-sm text-gray-600">
                      IRR: {deal.returns.forecastedIrr.toFixed(1)}%
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-4 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">High Score (≥80)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm text-gray-600">Medium Score (60-79)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600">Low Score (&lt;60)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineMap;