import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Database, LineChart, Building2, Map, Brain, Target, AlertTriangle, Info, BarChart2, Home, Clock } from 'lucide-react';

const PropTrackAnalysis: React.FC = () => {
  // Sample data for visualization
  const confidenceData = {
    labels: ['Premium Suburbs', 'Growth Areas', 'Emerging Markets', 'Regional Areas'],
    datasets: [{
      label: 'AVM Confidence Score',
      data: [98, 95, 92, 88],
      backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'],
      borderRadius: 8
    }]
  };

  const growthPredictionData = {
    labels: ['1Y', '2Y', '3Y', '4Y', '5Y'],
    datasets: [
      {
        label: 'Historical Accuracy',
        data: [97, 94, 91, 88, 85],
        borderColor: '#3b82f6',
        tension: 0.4
      },
      {
        label: 'Confidence Level',
        data: [95, 92, 88, 85, 82],
        borderColor: '#22c55e',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Data Collection Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Data Collection Infrastructure</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Property Data</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• 40+ years historical data</li>
              <li>• 4+ trillion data points</li>
              <li>• Real-time market updates</li>
              <li>• Property attributes</li>
              <li>• Historical transactions</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Market Indicators</h4>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Suburb-level metrics</li>
              <li>• Price movements</li>
              <li>• Demographic trends</li>
              <li>• Economic indicators</li>
              <li>• Development data</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">External Sources</h4>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li>• Government records</li>
              <li>• Census data</li>
              <li>• Infrastructure plans</li>
              <li>• School catchments</li>
              <li>• Transport data</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AVM Confidence Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AVM Confidence by Region</h3>
          <div className="h-[400px]">
            <Bar 
              data={confidenceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Confidence Score (%)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Prediction Accuracy</h3>
          <div className="h-[400px]">
            <Line 
              data={growthPredictionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Accuracy (%)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Risk Adjustment Process */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Target className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Risk Adjustment Methodology</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Base AVM Accuracy</div>
            <div className="text-2xl font-semibold">95-98%</div>
            <div className="text-xs text-gray-500 mt-1">For premium suburbs</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Standard Deviation</div>
            <div className="text-2xl font-semibold">±2.5%</div>
            <div className="text-xs text-gray-500 mt-1">Price range confidence</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Comparable Sales</div>
            <div className="text-2xl font-semibold">127+</div>
            <div className="text-xs text-gray-500 mt-1">Average matches per property</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Market Trend Accuracy</div>
            <div className="text-2xl font-semibold">94%</div>
            <div className="text-xs text-gray-500 mt-1">12-month prediction</div>
          </div>
        </div>
      </div>

      {/* Growth Prediction Model */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Brain className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Growth Prediction Model</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3">Historical Analysis (40%)</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• 15-year price trends</li>
              <li>• Seasonal adjustments</li>
              <li>• Volume analysis</li>
              <li>• Price volatility patterns</li>
              <li>• Cyclical behavior</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-3">Current Market (35%)</h4>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• Active listings analysis</li>
              <li>• Days on market</li>
              <li>• Auction clearance rates</li>
              <li>• Buyer demand indicators</li>
              <li>• Market sentiment</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-3">Forward Indicators (25%)</h4>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li>• Development applications</li>
              <li>• Infrastructure projects</li>
              <li>• Population projections</li>
              <li>• Economic indicators</li>
              <li>• Zoning changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Processing Flow */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <LineChart className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Data Processing Pipeline</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between relative">
            <div className="w-1/4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Data Collection</h4>
              <p className="text-sm text-blue-700 mt-2">Real-time property data ingestion from multiple sources</p>
            </div>
            <div className="absolute left-1/4 right-3/4 h-0.5 bg-blue-200"></div>
            
            <div className="w-1/4 bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Preprocessing</h4>
              <p className="text-sm text-green-700 mt-2">Data cleaning and standardization</p>
            </div>
            <div className="absolute left-1/2 right-1/2 h-0.5 bg-green-200"></div>
            
            <div className="w-1/4 bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900">Analysis</h4>
              <p className="text-sm text-purple-700 mt-2">ML model processing and risk assessment</p>
            </div>
            <div className="absolute left-3/4 right-1/4 h-0.5 bg-purple-200"></div>
            
            <div className="w-1/4 bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-900">Decision Making</h4>
              <p className="text-sm text-indigo-700 mt-2">Automated valuation and risk scoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">PropTrack Data Accuracy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AVM Accuracy</span>
                <span className="font-medium">95-98%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Growth Rate Prediction</span>
                <span className="font-medium">±1.2%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Comparable Sales Match</span>
                <span className="font-medium">127 avg</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Market Trend Analysis</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rental Yield Estimation</span>
                <span className="font-medium">±0.3%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '97%' }}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Suburb Trend Accuracy</span>
                <span className="font-medium">96%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropTrackAnalysis;