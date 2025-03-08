import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
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
          callback: (value: number) => `${value}%`
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly IRR</p>
              <p className="text-2xl font-semibold mt-1">16.61%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total AUM</p>
              <p className="text-2xl font-semibold mt-1">$19.3M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weighted LTV</p>
              <p className="text-2xl font-semibold mt-1">29.84%</p>
            </div>
            <Percent className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Loans</p>
              <p className="text-2xl font-semibold mt-1">8</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="h-[400px]">
            <Line data={monthlyData} options={options} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Interest Income</span>
              <span className="font-semibold">$1,126,667</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Appreciation Share</span>
              <span className="font-semibold">$3,344,825</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Returns</span>
              <span className="font-semibold text-green-600">$4,471,492</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;