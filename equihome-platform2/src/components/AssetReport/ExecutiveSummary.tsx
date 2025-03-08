import React from 'react';
import { TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';

const ExecutiveSummary: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="prose max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          Equihome has pioneered a new asset class in Australia that enables sophisticated foreign 
          investors from the US to participate in the strong unit economics of the Australian real 
          estate market appreciation without traditional barriers to entry. By eliminating upfront 
          stamp duty, high down payments, and balance sheet debt, our model provides a secure, 
          asset-backed investment opportunity with historically proven performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio IRR</p>
              <p className="text-3xl font-bold mt-1">16.61%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total AUM</p>
              <p className="text-3xl font-bold mt-1">$19.3M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Weighted LTV</p>
              <p className="text-3xl font-bold mt-1">29.84%</p>
            </div>
            <Percent className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Loans</p>
              <p className="text-3xl font-bold mt-1">8</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Highlights</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></div>
              <p className="text-gray-600">
                Strong risk-adjusted returns with 16.61% IRR and significant downside protection
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></div>
              <p className="text-gray-600">
                Conservative average LTV of 29.84% provides substantial equity buffer
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></div>
              <p className="text-gray-600">
                92% concentration in premium green zones with strong market fundamentals
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></div>
              <p className="text-gray-600">
                Zero defaults and robust regulatory framework protecting investor interests
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Market Position</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-600 mr-3"></div>
              <p className="text-gray-600">
                Focused on Sydney's premium suburbs with proven long-term appreciation
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-600 mr-3"></div>
              <p className="text-gray-600">
                Data-driven valuation and risk assessment through comprehensive digital infrastructure
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-600 mr-3"></div>
              <p className="text-gray-600">
                Superior market fundamentals compared to US residential real estate
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-600 mr-3"></div>
              <p className="text-gray-600">
                Innovative model unlocking value in Australia's high-equity property market
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;