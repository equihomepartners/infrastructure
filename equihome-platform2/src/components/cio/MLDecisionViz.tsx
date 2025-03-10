import React from 'react';
import { Bar } from 'react-chartjs-2';
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

interface MLDecisionVizProps {
  analysis: any | null;
  isLoading?: boolean;
}

const MLDecisionViz: React.FC<MLDecisionVizProps> = ({ analysis, isLoading = false }) => {
  const defaultMetrics = {
    growth: 0,
    risk: 0,
    infrastructure: 0,
    transport: 0,
    schools: 0
  };

  const metrics = analysis?.metrics || defaultMetrics;

  const chartData = {
    labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
    datasets: [
      {
        label: 'Metrics',
        data: [
          metrics.growth,
          metrics.risk,
          metrics.infrastructure,
          metrics.transport,
          metrics.schools
        ],
        backgroundColor: analysis ? [
          'rgba(34, 197, 94, 0.6)',  // green - growth
          'rgba(239, 68, 68, 0.6)',  // red - risk
          'rgba(59, 130, 246, 0.6)', // blue - infrastructure
          'rgba(249, 115, 22, 0.6)', // orange - transport
          'rgba(168, 85, 247, 0.6)'  // purple - schools
        ] : Array(5).fill('rgba(148, 163, 184, 0.2)'), // gray for no data
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
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ML Decision Visualization</h3>
        {!analysis && (
          <div className="text-sm text-gray-500 mb-4">
            Select a suburb to view ML decision metrics
          </div>
        )}
      </div>

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
                <span className={`font-medium ${analysis ? 'text-gray-900' : 'text-gray-400'}`}>
                  {formatNumber.percentage(metrics.risk)}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${analysis ? 'bg-red-500' : 'bg-gray-200'}`}
                  style={{ width: `${metrics.risk}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Growth Potential</span>
                <span className={`font-medium ${analysis ? 'text-green-600' : 'text-gray-400'}`}>
                  {formatNumber.percentage(metrics.growth)}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${analysis ? 'bg-green-500' : 'bg-gray-200'}`}
                  style={{ width: `${metrics.growth}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Infrastructure Score</span>
                <span className={`font-medium ${analysis ? 'text-blue-600' : 'text-gray-400'}`}>
                  {formatNumber.percentage(metrics.infrastructure)}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${analysis ? 'bg-blue-500' : 'bg-gray-200'}`}
                  style={{ width: `${metrics.infrastructure}%` }}
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
                <span className={`font-medium ${analysis ? 'text-orange-600' : 'text-gray-400'}`}>
                  {formatNumber.percentage(metrics.transport)}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${analysis ? 'bg-orange-500' : 'bg-gray-200'}`}
                  style={{ width: `${metrics.transport}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Schools</span>
                <span className={`font-medium ${analysis ? 'text-purple-600' : 'text-gray-400'}`}>
                  {formatNumber.percentage(metrics.schools)}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${analysis ? 'bg-purple-500' : 'bg-gray-200'}`}
                  style={{ width: `${metrics.schools}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ML Insights */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`rounded-lg p-4 ${analysis ? 'bg-green-50' : 'bg-gray-50'}`}>
          <h5 className={`font-medium mb-2 ${analysis ? 'text-green-800' : 'text-gray-600'}`}>Growth Drivers</h5>
          <p className={`text-sm ${analysis ? 'text-green-700' : 'text-gray-500'}`}>
            {analysis ? (
              metrics.growth > 75 ? 'Strong market momentum' :
              metrics.growth > 50 ? 'Steady appreciation' :
              'Stable growth potential'
            ) : 'Growth analysis pending'}
          </p>
        </div>

        <div className={`rounded-lg p-4 ${analysis ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <h5 className={`font-medium mb-2 ${analysis ? 'text-blue-800' : 'text-gray-600'}`}>Infrastructure Impact</h5>
          <p className={`text-sm ${analysis ? 'text-blue-700' : 'text-gray-500'}`}>
            {analysis ? (
              metrics.infrastructure > 75 ? 'Excellent amenities' :
              metrics.infrastructure > 50 ? 'Good development' :
              'Basic infrastructure'
            ) : 'Infrastructure analysis pending'}
          </p>
        </div>

        <div className={`rounded-lg p-4 ${analysis ? 'bg-purple-50' : 'bg-gray-50'}`}>
          <h5 className={`font-medium mb-2 ${analysis ? 'text-purple-800' : 'text-gray-600'}`}>Area Development</h5>
          <p className={`text-sm ${analysis ? 'text-purple-700' : 'text-gray-500'}`}>
            {analysis ? (
              metrics.schools > 75 ? 'Premium location' :
              metrics.schools > 50 ? 'Developing area' :
              'Growth corridor'
            ) : 'Area analysis pending'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLDecisionViz; 