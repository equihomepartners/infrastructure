import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { SuburbAnalysis } from '../../types/zoning';

interface Props {
  analysis: SuburbAnalysis;
}

const TrendAnalysis: React.FC<Props> = ({ analysis }) => {
  const priceData = {
    labels: analysis.historicalTrends.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Median Price',
        data: analysis.historicalTrends.map(t => t.medianPrice),
        borderColor: '#3b82f6',
        tension: 0.4
      }
    ]
  };

  const growthData = {
    labels: analysis.historicalTrends.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Growth Rate',
        data: analysis.historicalTrends.map(t => t.growthRate),
        borderColor: '#22c55e',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Trend Analysis</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium mb-4">Price History</h4>
          <div className="h-64">
            <Line
              data={priceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Growth Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium mb-4">Growth Trends</h4>
          <div className="h-64">
            <Line
              data={growthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Market Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">Market Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Days on Market</span>
              <span className="font-medium">{analysis.metrics.marketMetrics.daysOnMarket}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clearance Rate</span>
              <span className="font-medium">{analysis.metrics.marketMetrics.clearanceRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">Demographics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Population</span>
              <span className="font-medium">{analysis.metrics.demographics.population.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Median Age</span>
              <span className="font-medium">{analysis.metrics.demographics.medianAge}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">Development</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Infrastructure</span>
              <span className="font-medium">{analysis.metrics.infrastructure}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transport</span>
              <span className="font-medium">{analysis.metrics.transport}/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis; 