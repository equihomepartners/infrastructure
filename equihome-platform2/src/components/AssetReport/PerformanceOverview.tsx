import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Percent, Building2, LineChart } from 'lucide-react';
import { commonOptions } from '../fund/ChartConfig';

const PerformanceOverview: React.FC = () => {
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio IRR',
        data: [15.2, 15.8, 16.1, 16.5, 17.2, 17.8, 18.1, 18.5, 18.8, 19.1, 19.5, 20.1],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio IRR</p>
              <p className="text-2xl font-semibold mt-1">16.61%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total AUM</p>
              <p className="text-2xl font-semibold mt-1">$19.3M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Weighted LTV</p>
              <p className="text-2xl font-semibold mt-1">29.84%</p>
            </div>
            <Percent className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio Growth</p>
              <p className="text-2xl font-semibold mt-1">26.88%</p>
            </div>
            <LineChart className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Loans</p>
              <p className="text-2xl font-semibold mt-1">8</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <Line 
          data={monthlyData} 
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                display: true,
                text: 'Portfolio Performance Trend',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            }
          }} 
        />
      </div>
    </section>
  );
};

export default PerformanceOverview;