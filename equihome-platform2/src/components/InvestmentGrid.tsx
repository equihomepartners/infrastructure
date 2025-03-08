import React from 'react';
import DealCard from './DealCard';
import { sampleDeals } from '../data/sampleDeals';

const InvestmentGrid: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Example Loans
        </h1>
        <div className="space-y-4">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated selection of historical deals that showcase Equihome's investment thesis and underwriting model.
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            These transactions feature real-time property valuations and growth data from actual sales, demonstrating our ability to identify and structure optimal deals in Sydney's premium suburbs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleDeals.map((deal, index) => (
          <DealCard key={`deal-card-${deal.id}-${index}`} deal={deal} index={index} />
        ))}
      </div>
    </div>
  );
};

export default InvestmentGrid;