import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { formatNumber } from '../../utils/formatters';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

interface Props {
  analysis: {
    metrics: {
      growth: number;
      risk: number;
      infrastructure: number;
      transport: number;
      schools: number;
    };
  };
}

const MLDecisionViz: React.FC<Props> = ({ analysis }) => {
  const chartData = {
    labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
    datasets: [
      {
        label: 'Metrics',
        data: [
          analysis.metrics.growth,
          analysis.metrics.risk,
          analysis.metrics.infrastructure,
          analysis.metrics.transport,
          analysis.metrics.schools
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',  // green - growth
          'rgba(239, 68, 68, 0.6)',  // red - risk
          'rgba(59, 130, 246, 0.6)', // blue - infrastructure
          'rgba(249, 115, 22, 0.6)', // orange - transport
          'rgba(168, 85, 247, 0.6)'  // purple - schools
        ],
        borderWidth: 1,
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'ML Decision Metrics',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${formatNumber.percentage(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score',
          font: {
            weight: 'bold' as const
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        type: 'category' as const,
        grid: {
          display: false
        }
      }
    }
  } as const;

  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <div className="bg-white rounded-lg p-4 border">
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Risk Assessment */}
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-3">Risk Assessment</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Market Risk</span>
                <span className="font-medium">{formatNumber.percentage(analysis.metrics.risk)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.metrics.risk}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Growth Potential</span>
                <span className="font-medium text-green-600">{formatNumber.percentage(analysis.metrics.growth)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.metrics.growth}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Infrastructure Score</span>
                <span className="font-medium text-blue-600">{formatNumber.percentage(analysis.metrics.infrastructure)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.metrics.infrastructure}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Area Metrics */}
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-gray-900 mb-3">Area Metrics</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Transport</span>
                <span className="font-medium text-orange-600">{formatNumber.percentage(analysis.metrics.transport)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.metrics.transport}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Schools</span>
                <span className="font-medium text-purple-600">{formatNumber.percentage(analysis.metrics.schools)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.metrics.schools}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ML Insights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <h5 className="font-medium text-green-800 mb-2">Growth Drivers</h5>
          <p className="text-sm text-green-700">
            {analysis.metrics.growth > 75 ? 'Strong market momentum' :
             analysis.metrics.growth > 50 ? 'Steady appreciation' :
             'Stable growth potential'}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h5 className="font-medium text-blue-800 mb-2">Infrastructure Impact</h5>
          <p className="text-sm text-blue-700">
            {analysis.metrics.infrastructure > 75 ? 'Excellent amenities' :
             analysis.metrics.infrastructure > 50 ? 'Good development' :
             'Basic infrastructure'}
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h5 className="font-medium text-purple-800 mb-2">Area Development</h5>
          <p className="text-sm text-purple-700">
            {analysis.metrics.schools > 75 ? 'Premium location' :
             analysis.metrics.schools > 50 ? 'Developing area' :
             'Growth corridor'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLDecisionViz; 