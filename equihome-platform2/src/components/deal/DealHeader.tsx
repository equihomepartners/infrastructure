import React from 'react';
import { MapPin } from 'lucide-react';
import type { Deal } from '../../types';

interface Props {
  deal: Deal;
}

const DealHeader: React.FC<Props> = ({ deal }) => {
  // Calculate LVRs
  const startLVR = (deal.propertyDetails.firstMortgage / deal.propertyValue) * 100;
  const combinedLVR = ((deal.propertyDetails.firstMortgage + deal.loanAmount) / deal.propertyValue) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-96">
        <img 
          src={deal.images.exterior} 
          alt={`${deal.suburb} property`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <h1 className="text-3xl font-semibold text-white mb-2">{deal.suburb}</h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Sydney, NSW</span>
          </div>
        </div>
        <div className="absolute top-6 right-6 flex flex-col items-end space-y-2">
          <div className={`px-4 py-2 rounded-lg ${
            (deal.irr ?? 0) >= 20 ? 'bg-green-100 text-green-800' :
            (deal.irr ?? 0) >= 15 ? 'bg-green-50 text-green-700' : 
            'bg-green-50 text-green-600'
          }`}>
            <span className="font-semibold">{deal.irr?.toFixed(2) ?? 'N/A'}% IRR</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/90 text-gray-900">
            <span className="font-semibold">Loan: ${deal.loanAmount?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Proptrack AVM</div>
              <div className="text-xl font-semibold">
                ${deal.propertyValue?.toLocaleString() ?? 'N/A'}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Equihome AVM (Discounted)</div>
              <div className="text-xl font-semibold">
                ${(deal.propertyValue * 0.9).toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Discount Rate</div>
              <div className="text-xl font-semibold">10%</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Existing Debt</div>
              <div className="text-xl font-semibold">
                ${deal.propertyDetails.firstMortgage?.toLocaleString() ?? '0'}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">LVR Start</div>
              <div className="text-xl font-semibold">
                {startLVR.toFixed(2)}%
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Combined LVR</div>
              <div className="text-xl font-semibold">
                {combinedLVR.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealHeader;