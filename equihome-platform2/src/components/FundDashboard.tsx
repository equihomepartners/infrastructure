import React from 'react';
import FundMetrics from './fund/FundMetrics';
import PortfolioDistribution from './fund/PortfolioDistribution';
import GeographicDistribution from './fund/GeographicDistribution';
import CashflowAnalysis from './fund/CashflowAnalysis';
import IncomeAnalysis from './fund/IncomeAnalysis';
import LTVAnalysis from './fund/LTVAnalysis';

const FundDashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fund Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive overview of the fund's performance and portfolio metrics
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Portfolio Age Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-blue-600">Average Deal Age</div>
            <div className="text-lg font-semibold text-blue-700">5.1 years</div>
          </div>
          <div>
            <div className="text-xs text-blue-600">Deal Date Range</div>
            <div className="text-lg font-semibold text-blue-700">2/1/2019 - Present</div>
          </div>
        </div>
      </div>

      <FundMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PortfolioDistribution />
        <GeographicDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <IncomeAnalysis />
        <CashflowAnalysis />
      </div>

      <LTVAnalysis />
    </div>
  );
};

export default FundDashboard;