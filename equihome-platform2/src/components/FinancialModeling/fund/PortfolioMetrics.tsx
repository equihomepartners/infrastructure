import React from 'react';
import { Line } from 'react-chartjs-2';
import { DollarSign, TrendingUp, Building2, Percent } from 'lucide-react';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';

const PortfolioMetrics: React.FC = () => {
  const { inputs } = useFundStore();
  const metrics = calculateFundMetrics(inputs);

  const returnData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [
      {
        label: 'Interest Returns',
        data: metrics.yearlyReturns.map(r => r.interestReturn / 1000000), // Convert to millions
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Appreciation Returns',
        data: metrics.yearlyReturns.map(r => r.appreciationReturn / 1000000), // Convert to millions
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  const irrData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [{
      label: 'Portfolio IRR',
      data: metrics.yearlyReturns.map(r => r.irr),
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Deal Size</p>
              <p className="text-2xl font-semibold mt-1">
                ${(metrics.averageDealSize / 1000000).toFixed(1)}M
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weighted LTV</p>
              <p className="text-2xl font-semibold mt-1">
                {metrics.weightedLTV.toFixed(1)}%
              </p>
            </div>
            <Percent className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-2xl font-semibold mt-1">
                {metrics.weightedGrowthRate.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">10-Year IRR</p>
              <p className="text-2xl font-semibold mt-1">
                {metrics.yearlyReturns[9].irr.toFixed(1)}%
              </p>
            </div>
            <Building2 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Components</h3>
          <div className="h-[400px]">
            <Line
              data={returnData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio IRR</h3>
          <div className="h-[400px]">
            <Line
              data={irrData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'IRR (%)'
                    },
                    ticks: {
                      callback: (value: number) => `${value.toFixed(1)}%`
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMetrics;