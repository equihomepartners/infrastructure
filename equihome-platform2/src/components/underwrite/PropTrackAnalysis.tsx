import React from 'react';
import { LineChart, Building2, Target, AlertTriangle, TrendingUp, Map, Database, Info, BarChart2, Home, Clock } from 'lucide-react';

interface Props {
  suburb: string;
  propertyValue: number;
}

const PropTrackAnalysis: React.FC<Props> = ({ suburb, propertyValue }) => {
  return (
    <div className="space-y-6">
      {/* Demo Data Notice */}
      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
        <div className="flex">
          <Info className="h-6 w-6 text-indigo-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">Demo Data Notice</h3>
            <p className="mt-1 text-sm text-indigo-700">
              This is a demonstration using sample data. In production, this analysis will use real-time data from PropTrack's API, 
              providing access to over 40 years of property data, including 4+ trillion data points across sales history, 
              property attributes, and market indicators.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">PropTrack Data Analysis</h3>
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          <Database className="h-4 w-4" />
          <span>View Full PropTrack Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <Building2 className="h-5 w-5 text-indigo-600 mr-2" />
            Property Valuation Confidence
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">AVM Confidence Score</span>
                <span className="font-medium text-indigo-600">95%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Based on:
              <ul className="mt-2 space-y-1">
                <li>• 127 comparable sales in the last 12 months</li>
                <li>• 14 similar properties currently listed</li>
                <li>• Historical sales data from 2000-present</li>
                <li>• Property-specific attributes match</li>
                <li>• 45 recent sales within 500m radius</li>
                <li>• 8 properties with identical floor plans</li>
                <li>• 12 properties with matching build year</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <Map className="h-5 w-5 text-indigo-600 mr-2" />
            Suburb Analysis
          </h4>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Data points analyzed:
              <ul className="mt-2 space-y-1">
                <li>• 15 years of suburb-level price movements</li>
                <li>• 5,234 historical transactions</li>
                <li>• Demographic trends from 2000-present</li>
                <li>• Infrastructure development impact</li>
                <li>• School catchment value impact</li>
                <li>• Transport accessibility scores</li>
                <li>• Renovation activity tracking</li>
                <li>• Development application trends</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
          <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
          Growth Rate Calculation Methodology
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-medium text-gray-900 mb-3">Historical Data (40%)</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 15-year price trends</li>
              <li>• Seasonal adjustments</li>
              <li>• Volume analysis</li>
              <li>• Price volatility patterns</li>
              <li>• Cyclical market behavior</li>
              <li>• Historical growth rates</li>
              <li>• Price correction patterns</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-medium text-gray-900 mb-3">Current Market (35%)</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Active listings analysis</li>
              <li>• Days on market</li>
              <li>• Auction clearance rates</li>
              <li>• Buyer demand indicators</li>
              <li>• Price guide accuracy</li>
              <li>• Vendor discounting</li>
              <li>• Market sentiment index</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-medium text-gray-900 mb-3">Forward Indicators (25%)</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Development applications</li>
              <li>• Infrastructure projects</li>
              <li>• Population projections</li>
              <li>• Economic indicators</li>
              <li>• Zoning changes</li>
              <li>• Employment trends</li>
              <li>• Transport developments</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-indigo-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">PropTrack Data Accuracy</h3>
            <div className="mt-2 text-sm text-gray-600">
              <p className="mb-2">Confidence metrics for this property:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>AVM Accuracy: 95-98% for premium suburbs</li>
                <li>Growth Rate Prediction: ±1.2% margin of error</li>
                <li>Comparable Sales: High confidence (127 matches)</li>
                <li>Market Trend Analysis: 94% accuracy rate</li>
                <li>Rental Yield Estimation: ±0.3% margin</li>
                <li>Price Range Confidence: ±2.5%</li>
                <li>Suburb Trend Accuracy: 96%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <Target className="h-5 w-5 text-indigo-600 mr-2" />
            Suburb Metrics
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Median Price (House)</span>
              <span className="font-medium text-gray-900">$2,450,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">12-Month Growth</span>
              <span className="font-medium text-gray-900">7.2%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">5-Year CAGR</span>
              <span className="font-medium text-gray-900">6.8%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Days on Market</span>
              <span className="font-medium text-gray-900">24</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Price Per Square Meter</span>
              <span className="font-medium text-gray-900">$12,450</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Median Rental Yield</span>
              <span className="font-medium text-gray-900">3.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <LineChart className="h-5 w-5 text-indigo-600 mr-2" />
            Market Indicators
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Auction Clearance Rate</span>
              <span className="font-medium text-gray-900">78%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Buyer Demand Index</span>
              <span className="font-medium text-gray-900">8.4/10</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Stock Levels vs 5Y Avg</span>
              <span className="font-medium text-red-600">-12%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Price Momentum</span>
              <span className="font-medium text-green-600">Strong</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Vendor Discounting</span>
              <span className="font-medium text-gray-900">-2.1%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Time on Market Trend</span>
              <span className="font-medium text-green-600">Decreasing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <Home className="h-5 w-5 text-indigo-600 mr-2" />
            Property-Specific Metrics
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Last Sale Price</span>
              <span className="font-medium text-gray-900">$1,850,000 (2019)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Land Value Growth</span>
              <span className="font-medium text-green-600">8.4% p.a.</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Renovation Premium</span>
              <span className="font-medium text-green-600">+12%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Comparable Sales Range</span>
              <span className="font-medium text-gray-900">$2.2M - $2.7M</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Property Score</span>
              <span className="font-medium text-indigo-600">8.7/10</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
            <Clock className="h-5 w-5 text-indigo-600 mr-2" />
            Historical Performance
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">10-Year Growth</span>
              <span className="font-medium text-green-600">112%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Peak Price (2022)</span>
              <span className="font-medium text-gray-900">$2,680,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Lowest Price (2013)</span>
              <span className="font-medium text-gray-900">$1,250,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Price Volatility</span>
              <span className="font-medium text-green-600">Low</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Recovery Time</span>
              <span className="font-medium text-gray-900">4-6 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropTrackAnalysis;