import React from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { getSuburbAnalysis } from '../../services/mlAnalytics';
import { Brain, TrendingUp, Clock, RefreshCw, Database } from 'lucide-react';

interface Props {
  suburb: string;
}

const EnhancedMLAnalysis: React.FC<Props> = ({ suburb }) => {
  const analysis = getSuburbAnalysis(suburb);

  // Historical trend data simulation
  const trendData = {
    labels: ['6M ago', '5M ago', '4M ago', '3M ago', '2M ago', '1M ago', 'Current'],
    datasets: [
      {
        label: 'Growth Trend',
        data: Array(7).fill(0).map(() => analysis.metrics.growth + (Math.random() * 4 - 2)),
        borderColor: '#22c55e',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Risk Level',
        data: Array(7).fill(0).map(() => analysis.metrics.risk + (Math.random() * 4 - 2)),
        borderColor: '#ef4444',
        tension: 0.4,
        fill: false
      }
    ]
  };

  // ML Confidence radar chart
  const radarData = {
    labels: ['Data Quality', 'Model Confidence', 'Prediction Accuracy', 'Market Coverage', 'Historical Correlation'],
    datasets: [{
      label: 'ML Metrics',
      data: [
        analysis.updateMetrics.dataQuality,
        analysis.updateMetrics.confidence,
        analysis.updateMetrics.predictionAccuracy,
        92.5,  // Market coverage
        94.8   // Historical correlation
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3b82f6',
      pointBackgroundColor: '#3b82f6'
    }]
  };

  return (
    <div className="space-y-6">
      {/* ML System Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">ML Analysis Active</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                Last Update: {analysis.lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Database className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                Data Points: {analysis.dataPoints.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Market Sentiment */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Market Sentiment</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Potential</span>
              <span>{analysis.metrics.growth.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Level</span>
              <span>{analysis.metrics.risk.toFixed(1)}%</span>
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600">Model Version</div>
              <div className="font-mono text-sm">{analysis.modelVersion}</div>
            </div>
          </div>
        </div>

        {/* ML Confidence */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">ML Confidence</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Confidence</span>
              <span>{analysis.confidence.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Quality</span>
              <span>{analysis.updateMetrics.dataQuality.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prediction Accuracy</span>
              <span>{analysis.updateMetrics.predictionAccuracy.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Market Metrics */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Market Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Price Growth</span>
              <span className="text-green-600">
                {analysis.metrics.marketMetrics.priceGrowth.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rental Yield</span>
              <span className="text-green-600">
                {analysis.metrics.marketMetrics.rentalYield.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Median Price</span>
              <span>${analysis.metrics.marketMetrics.medianPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Historical Trends */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-4">Historical Trends</h4>
          <div className="h-64">
            <Line data={trendData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }} />
          </div>
        </div>

        {/* ML Confidence Radar */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-4">ML Confidence Metrics</h4>
          <div className="h-64">
            <Radar data={radarData} options={{
              responsive: true,
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    stepSize: 20
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 text-gray-600" />
            <h4 className="font-semibold">Real-time Updates</h4>
          </div>
          <span className="text-sm text-gray-600">
            Iteration #{analysis.iteration}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-600">Data Points</div>
            <div className="text-lg font-semibold">{analysis.dataPoints.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Last 24 hours</div>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-600">Model Confidence</div>
            <div className="text-lg font-semibold">{analysis.updateMetrics.confidence.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">Current iteration</div>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-600">Data Quality</div>
            <div className="text-lg font-semibold">{analysis.updateMetrics.dataQuality.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">Validation score</div>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-600">Prediction Accuracy</div>
            <div className="text-lg font-semibold">{analysis.updateMetrics.predictionAccuracy.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">Historical accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMLAnalysis; 