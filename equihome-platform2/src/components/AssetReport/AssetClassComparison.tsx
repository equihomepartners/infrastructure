import React from 'react';
import { Line } from 'react-chartjs-2';
import { commonOptions } from '../fund/ChartConfig';

const AssetClassComparison: React.FC = () => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Equihome Portfolio',
        data: [15.8, 16.2, 16.8, 17.4, 18.1, 16.61],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'Sydney Premium Real Estate',
        data: [10.2, 10.7, 11.1, 10.8, 10.4, 10.7],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'S&P 500',
        data: [12.5, 13.8, 14.2, 9.8, 10.2, 11.4],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'ASX 200',
        data: [9.8, 8.9, 10.2, 9.4, 9.8, 10.1],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'US Real Estate',
        data: [8.9, 9.2, 9.8, 8.7, 8.9, 9.1],
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        borderWidth: 3
      }
    ]
  };

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="max-w-3xl mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Asset Class Performance</h3>
          <p className="text-gray-600">
            Equihome's innovative model creates a new asset class that consistently outperforms 
            traditional investment options while maintaining strong downside protection through 
            its asset-backed structure.
          </p>
        </div>
        <div className="h-[500px]">
          <Line 
            data={data} 
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: {
                  display: true,
                  text: 'Historical IRR by Asset Class',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value: number) => `${value}%`,
                    font: {
                      size: 14
                    }
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                  }
                },
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    font: {
                      size: 14
                    }
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Key Performance Metrics</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">5-Year Average IRR</div>
                <div className="text-2xl font-bold text-indigo-600">16.61%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">vs S&P 500</div>
                <div className="text-lg font-semibold text-green-600">+5.21%</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Volatility</div>
                <div className="text-2xl font-bold text-indigo-600">4.2%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">vs ASX 200</div>
                <div className="text-lg font-semibold text-green-600">-8.3%</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Downside Protection</div>
                <div className="text-2xl font-bold text-indigo-600">70.16%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Equity Buffer</div>
                <div className="text-lg font-semibold text-green-600">Strong</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Asset Class Comparison</h3>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-2">Traditional Real Estate</div>
              <ul className="space-y-2 text-gray-600">
                <li>• Higher entry costs (20-30% down payment)</li>
                <li>• Active management required</li>
                <li>• Lower liquidity</li>
                <li>• Full market exposure</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-2">Public Equities</div>
              <ul className="space-y-2 text-gray-600">
                <li>• Higher volatility</li>
                <li>• No asset backing</li>
                <li>• Market correlation</li>
                <li>• Complex valuations</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900 mb-2">Equihome Model</div>
              <ul className="space-y-2 text-gray-600">
                <li>• Asset-backed security</li>
                <li>• No active management needed</li>
                <li>• Strong downside protection</li>
                <li>• Premium market exposure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetClassComparison;