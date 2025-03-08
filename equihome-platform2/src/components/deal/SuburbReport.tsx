import React from 'react';
import { MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Deal } from '../../types';

interface Props {
  deal: Deal;
}

const SuburbReport: React.FC<Props> = ({ deal }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">{deal.suburb} Suburb Report</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Suburb Median Price (3 Bedrooms)</div>
            <div className="text-lg font-semibold">
              ${deal.marketAnalysis.medianPrice.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Median Growth (5 Year History)</div>
            <div className="text-lg font-semibold">
              {deal.propertyDetails.yearlyGrowth}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Risk Adjustment</div>
            <div className="text-lg font-semibold">2%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Forward Forecasted Growth Rate</div>
            <div className="text-lg font-semibold">
              {deal.propertyDetails.forecastGrowth}%
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center">
        <div className={`
          px-3 py-1 rounded-full text-sm font-medium flex items-center
          ${deal.propertyDetails.trafficLight === 'Green' 
            ? 'bg-green-100 text-green-800'
            : deal.propertyDetails.trafficLight === 'Amber'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
          }
        `}>
          <AlertTriangle className="h-4 w-4 mr-1" />
          {deal.propertyDetails.trafficLight} Investment Zone in Sydney
        </div>
      </div>
    </div>
  );
};

export default SuburbReport;