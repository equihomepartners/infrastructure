import React from 'react';
import { Line } from 'react-chartjs-2';

const RiskMetrics: React.FC = () => {
  const ltvData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
    datasets: [
      {
        label: 'Portfolio LTV',
        data: [33.5, 32.8, 32.1, 31.5, 29.84],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3
      }
    ]
  };

  const options = {
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
        max: 40,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          callback: (value: number) => `${value}%`,
          font: {
            size: 14
          }
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
  };

  return (
    <div className="space-y-16">
      {/* Key Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="text-[48px] font-bold text-blue-600">29.84%</div>
          <div className="text-lg text-gray-600">Average LTV</div>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="text-[48px] font-bold text-green-600">0.0%</div>
          <div className="text-lg text-gray-600">Default Rate</div>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="text-[48px] font-bold text-blue-600">92%</div>
          <div className="text-lg text-gray-600">Green Zone Assets</div>
        </div>
      </div>

      {/* LTV Trend Chart */}
      <div className="bg-gray-50 p-12 rounded-xl">
        <div className="max-w-3xl mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Conservative LTV Trend
          </h3>
          <p className="text-gray-600">
            Our portfolio maintains consistently low LTV ratios, providing significant 
            downside protection while delivering strong risk-adjusted returns.
          </p>
        </div>
        <div className="h-[400px]">
          <Line data={ltvData} options={options} />
        </div>
      </div>

      {/* Risk Management Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Risk Management Framework
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
              <div className="text-gray-600">Maximum LTV threshold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
              <div className="text-gray-600">Maximum suburb exposure</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
              <div className="text-gray-600">Green zone target allocation</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Geographic Risk Controls
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">Premium</div>
              <div className="text-gray-600">Focus on premium Sydney suburbs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">Strong</div>
              <div className="text-gray-600">Employment markets & income levels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">Limited</div>
              <div className="text-gray-600">New supply in target areas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Risk Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Underwriting Controls
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>• Automated valuation models</li>
            <li>• Conservative value adjustments</li>
            <li>• Strict borrower criteria</li>
            <li>• Regular portfolio monitoring</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Market Risk Mitigation
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>• Geographic diversification</li>
            <li>• Property type restrictions</li>
            <li>• Market cycle analysis</li>
            <li>• Macro trend monitoring</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Operational Controls
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>• AI-driven risk assessment</li>
            <li>• Real-time monitoring</li>
            <li>• Regular stress testing</li>
            <li>• Automated alerts system</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;