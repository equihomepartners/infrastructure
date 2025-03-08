import React from 'react';
import { Bar } from 'react-chartjs-2';

const PortfolioMetrics: React.FC = () => {
  const ltvData = {
    labels: ['Low LTV (<65%)', 'Medium LTV (65-80%)', 'High LTV (80%+)'],
    datasets: [
      {
        data: [53, 38, 8],
        backgroundColor: '#2563EB',
        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 60,
        grid: {
          display: false
        },
        ticks: {
          callback: (value: number) => `${value}%`,
          font: {
            size: 14
          }
        }
      },
      y: {
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
  };

  return (
    <div className="space-y-16">
      <div className="bg-gray-50 p-12 rounded-xl">
        <div className="max-w-3xl mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            The majority of loan-to-value (LTV) ratios are low (&lt;65%)
          </h3>
          <p className="text-gray-600">
            Equihome maintains conservative LTV ratios across the portfolio, with a median 
            LTV of 29.84% at origination. This approach provides significant downside 
            protection while maintaining attractive returns.
          </p>
        </div>
        <div className="h-[300px]">
          <Bar data={ltvData} options={options} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Portfolio Statistics
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Average Property Value</div>
              <div className="text-2xl font-semibold">$1.9M</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Average Loan Size</div>
              <div className="text-2xl font-semibold">$595K</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Average Term</div>
              <div className="text-2xl font-semibold">7.2 years</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Risk Metrics
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Default Rate</div>
              <div className="text-2xl font-semibold text-green-600">0.0%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Green Zone Exposure</div>
              <div className="text-2xl font-semibold">92%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Avg Property Growth</div>
              <div className="text-2xl font-semibold">8.2%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMetrics;