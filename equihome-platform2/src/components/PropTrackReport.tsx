import React from 'react';
import { Building2, MapPin, Calendar, DollarSign, Info } from 'lucide-react';

interface PropTrackReportProps {
  propertyDetails: {
    address: string;
    suburb: string;
    postcode: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    landSize: number;
    propertyType: string;
    lotPlan: string;
    council: string;
  };
  valuation: {
    estimatedValue: number;
    lowRange: number;
    highRange: number;
    confidence: number;
    date: string;
    applicationAmount: number;
    loanAmount: number;
  };
  comparableSales: Array<{
    address: string;
    price: number;
    saleDate: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    landSize: number;
    propertyType: string;
  }>;
  propertyHistory: Array<{
    date: string;
    price: number;
    party: string;
  }>;
}

const PropTrackReport: React.FC<PropTrackReportProps> = ({
  propertyDetails,
  valuation,
  comparableSales,
  propertyHistory
}) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8">
        <div className="flex items-center mb-4">
          <img 
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            alt="PropTrack Logo"
            className="h-8 w-auto mr-4"
          />
          <div className="text-sm">PropTrack Reference: b58eedd0-bc16-44b3-a18c-93ac0ab4fd1d</div>
        </div>
        <h1 className="text-3xl font-bold mb-6">Property Estimated Value Report</h1>
        <div className="text-sm">powered by PropTrack</div>
      </div>

      {/* Report Details */}
      <div className="p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-xl font-bold mb-4">{propertyDetails.address}</div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Beds</div>
                  <div className="font-semibold">{propertyDetails.bedrooms}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Baths</div>
                  <div className="font-semibold">{propertyDetails.bathrooms}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Cars</div>
                  <div className="font-semibold">{propertyDetails.parking}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Land</div>
                  <div className="font-semibold">{propertyDetails.landSize}m²</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lot/Plan no:</span>
                  <span>{propertyDetails.lotPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LGA/Council:</span>
                  <span>{propertyDetails.council}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Estimated Value</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">Low range</div>
                <div className="text-2xl font-bold text-blue-600">${valuation.estimatedValue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">High range</div>
              </div>
              
              {/* Confidence Bar */}
              <div className="relative h-2 bg-gray-200 rounded-full mb-6">
                <div 
                  className="absolute h-full bg-blue-600 rounded-full"
                  style={{ width: `${valuation.confidence}%` }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Date Generated:</span>
                  <span>{valuation.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Application Est:</span>
                  <span>${valuation.applicationAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Loan Amount:</span>
                  <span>${valuation.loanAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparable Sales */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Comparable Sales</h2>
          <div className="space-y-4">
            {comparableSales.map((sale, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4">
                  <img 
                    src={`https://images.unsplash.com/photo-${1568605114967 + index}-8130f3a36994`}
                    alt={sale.address}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-semibold">{sale.address}</div>
                  <div className="text-sm text-gray-600">
                    {sale.bedrooms} beds • {sale.bathrooms} baths • {sale.parking} cars • {sale.landSize}m²
                  </div>
                  <div className="text-sm text-gray-600">Sold {sale.saleDate}</div>
                </div>
                <div className="text-lg font-semibold">${sale.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Property History */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Property History</h2>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Party</th>
              </tr>
            </thead>
            <tbody>
              {propertyHistory.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{record.date}</td>
                  <td className="px-4 py-2">${record.price.toLocaleString()}</td>
                  <td className="px-4 py-2">{record.party}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">
            This is a demo implementation. In production, this report would be generated using the PropTrack AVM Service.
          </p>
          <p>
            The Estimated Value of the property is an estimate provided at a point in time only and is therefore subject to change.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropTrackReport;