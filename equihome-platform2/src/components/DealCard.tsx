import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, DollarSign, Clock, Percent } from 'lucide-react';
import type { Deal } from '../types';

interface DealCardProps {
  deal: Deal;
  index: number;
}

const DealCard: React.FC<DealCardProps> = ({ deal, index }) => {
  // Calculate combined LTV including existing mortgage, with null check
  const firstMortgage = deal.propertyDetails?.firstMortgage || 0;
  const combinedLTV = ((firstMortgage + deal.loanAmount) / deal.propertyValue) * 100;

  return (
    <Link key={`deal-${deal.id}-${index}`} to={`/deal/${deal.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-48">
          <img 
            src={deal.images?.exterior || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994'} 
            alt={`${deal.suburb} property`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
            <span className={`font-medium ${
              deal.irr >= 20 ? 'text-green-600' :
              deal.irr >= 15 ? 'text-green-500' : 'text-green-400'
            }`}>
              {deal.irr?.toFixed(2)}% IRR
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {deal.suburb}
              </h3>
              <div className="flex items-center text-gray-600 mt-1">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{deal.propertyType}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Property Value</span>
              <span className="font-medium">
                ${deal.propertyValue?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Loan Amount</span>
              <span className="font-medium">
                ${deal.loanAmount?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">LTV</span>
              <span className="font-medium">
                {combinedLTV.toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Term</span>
              <div className="flex items-center text-gray-900 font-medium">
                <Clock className="h-4 w-4 mr-1" />
                <span>{deal.loanTerms.term} years</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Property Growth Rate</span>
              <div className="flex items-center text-green-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{deal.propertyDetails?.yearlyGrowth || 0}%</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-indigo-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>Total Return: ${((deal.interestEarned || 0) + (deal.equihomeFeeEarned || 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;