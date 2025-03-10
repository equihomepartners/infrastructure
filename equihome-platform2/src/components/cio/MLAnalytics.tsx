import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, AlertTriangle, Lightbulb, Brain, Loader2 } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface MLAnalyticsProps {
  analysis: any | null;
  isLoading?: boolean;
}

const MLAnalytics: React.FC<MLAnalyticsProps> = ({ analysis, isLoading = false }) => {
  // Default data for when no analysis is available
  const defaultData = {
    labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
    datasets: [{
      label: 'Metrics',
      data: [0, 0, 0, 0, 0],
      backgroundColor: 'rgba(148, 163, 184, 0.2)',
      borderColor: 'rgb(148, 163, 184)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 p-6 min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <p className="text-gray-600">Loading ML analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">ML Analytics</h3>
        <Brain className="h-5 w-5 text-gray-400" />
      </div>

      {!analysis ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-50 rounded-full">
            <Brain className="h-8 w-8 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Select a suburb on the map</p>
            <p className="text-sm text-gray-500">ML analysis will appear here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Growth Analysis */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Growth Analysis</h4>
            <div className="h-48">
              <Bar 
                data={analysis?.growthAnalysis || defaultData}
                options={chartOptions}
              />
            </div>
          </div>

          {/* Risk Metrics */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Risk Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Market Risk</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {analysis ? formatNumber.percentage(analysis.metrics?.risk || 0) : '--%'}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Confidence</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {analysis ? formatNumber.percentage(analysis.metrics?.confidence || 0) : '--%'}
                </div>
              </div>
            </div>
          </div>

          {/* ML Insights */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">ML Insights</h4>
            <div className="space-y-2">
              {analysis?.insights?.length > 0 ? (
                analysis.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-sm text-blue-900">{insight}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-500">No ML insights available for this suburb</span>
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Metrics</h4>
            <div className="grid grid-cols-3 gap-4">
              {['Growth', 'Infrastructure', 'Schools'].map((metric) => (
                <div key={metric} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{metric}</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {analysis ? formatNumber.percentage(analysis.metrics?.[metric.toLowerCase()] || 0) : '--%'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLAnalytics; 