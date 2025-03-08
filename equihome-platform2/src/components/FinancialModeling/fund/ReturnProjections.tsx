import React from 'react';
import { Line } from 'react-chartjs-2';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';

const ReturnProjections: React.FC = () => {
  const { inputs } = useFundStore();
  const metrics = calculateFundMetrics(inputs);

  const cumulativeData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [{
      label: 'Cumulative Returns',
      data: metrics.yearlyReturns.map(r => r.totalReturn / 1000000), // Convert to millions
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const returnBreakdownData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [
      {
        label: 'Interest Returns',
        data: metrics.yearlyReturns.map(r => r.interestReturn / 1000000),
        backgroundColor: '#3B82F6'
      },
      {
        label: 'Appreciation Returns',
        data: metrics.yearlyReturns.map(r => r.appreciationReturn / 1000000),
        backgroundColor: '#10B981'
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cumulative Returns</h3>
        <div className="h-[400px]">
          <Line
            data={cumulativeData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Returns ($M)'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Components</h3>
        <div className="h-[400px]">
          <Line
            data={returnBreakdownData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                }
              },
              scales: {
                y: {
                  stacked: true,
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Returns ($M)'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Returns (Year 10)</div>
            <div className="text-2xl font-semibold">
              ${(metrics.yearlyReturns[9].totalReturn / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Interest Component</div>
            <div className="text-2xl font-semibold">
              ${(metrics.yearlyReturns[9].interestReturn / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Appreciation Component</div>
            <div className="text-2xl font-semibold">
              ${(metrics.yearlyReturns[9].appreciationReturn / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnProjections;