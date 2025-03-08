import React from 'react';
import { Building2, TrendingUp, Database, Shield } from 'lucide-react';

const USComparison: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Market Size & Equity Comparison</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Australia Market */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">Australia</h4>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Market Value</div>
                <div className="text-3xl font-bold text-indigo-600">$10.2T</div>
              </div>
              <div className="relative pt-1">
                <div className="text-sm text-gray-600 mb-2">Equity Distribution</div>
                <div className="flex h-4 rounded-full overflow-hidden">
                  <div className="w-[79.4%] bg-green-500"></div>
                  <div className="w-[20.6%] bg-red-400"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-600 font-medium">79.4% Equity ($8.1T)</span>
                  <span className="text-red-500 font-medium">20.6% Debt ($2.1T)</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Average Property Value</div>
                <div className="text-2xl font-bold text-indigo-600">$940K</div>
              </div>
            </div>
          </div>

          {/* US Market */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">United States</h4>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Market Value</div>
                <div className="text-3xl font-bold text-gray-600">$43.5T</div>
              </div>
              <div className="relative pt-1">
                <div className="text-sm text-gray-600 mb-2">Equity Distribution</div>
                <div className="flex h-4 rounded-full overflow-hidden">
                  <div className="w-[40.2%] bg-green-500"></div>
                  <div className="w-[59.8%] bg-red-400"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-600 font-medium">40.2% Equity ($17.5T)</span>
                  <span className="text-red-500 font-medium">59.8% Debt ($26T)</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Average Property Value</div>
                <div className="text-2xl font-bold text-gray-600">$420K</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Australian Market Advantages
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 text-blue-600 mr-3" />
                <h4 className="text-lg font-semibold text-blue-900">Lower LTVs & Higher Equity</h4>
              </div>
              <p className="text-blue-800">
                Australian homeowners maintain significantly lower LTVs and have substantially more 
                equity trapped in their properties, providing a stronger foundation for our investment model.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                <h4 className="text-lg font-semibold text-green-900">Concentrated Market Opportunity</h4>
              </div>
              <p className="text-green-800">
                Australia's concentrated urban markets allow us to focus on premium suburbs within major 
                cities, enabling deeper market understanding and more precise risk assessment compared 
                to the geographically dispersed US market.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-purple-600 mr-3" />
                <h4 className="text-lg font-semibold text-purple-900">Superior Data Infrastructure</h4>
              </div>
              <p className="text-purple-800">
                Australia's digitized real estate market, backed by government, banking, and private 
                data sources, enables hyper-accurate property valuations and instantaneous risk 
                adjustments, eliminating emotional valuation metrics.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600 mr-3" />
                <h4 className="text-lg font-semibold text-indigo-900">Regulatory Environment</h4>
              </div>
              <p className="text-indigo-800">
                Australia's highly regulated climate provides robust support for Equihome's model 
                and legal framework, making default scenarios more straightforward and predictable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USComparison;