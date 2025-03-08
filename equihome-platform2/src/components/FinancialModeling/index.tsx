import React from 'react';
import { Calculator } from 'lucide-react';
import FundModelTabs from './fund/FundModelTabs';

const FinancialModeling: React.FC = () => {
  return (
    <div className="relative">
      {/* Under Development Overlay - Changed from fixed to absolute positioning */}
      <div className="absolute inset-0 bg-gray-900/80 z-40 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-gray-800/90 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Under Development</h2>
          <p className="text-xl text-gray-200 mb-2">This section is being redeveloped in v2.0</p>
          <p className="text-gray-400 mb-4">Current Version: v1.32</p>
          <p className="text-sm text-gray-300">You can navigate to other sections while we work on the improvements</p>
        </div>
      </div>

      {/* Existing Content (will be behind overlay but clickable) */}
      <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Financial Modeling
            </h1>
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Model potential returns and analyze exit scenarios
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            Individual Model
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            Fund Model
          </button>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">Fund Model Parameters</h3>
              <p className="mt-2 text-yellow-700">
                Configure the fund's target size, composition, and return expectations.
              </p>
            </div>
          </div>
        </div>

        <FundModelTabs />
      </div>
    </div>
  );
};

export default FinancialModeling;