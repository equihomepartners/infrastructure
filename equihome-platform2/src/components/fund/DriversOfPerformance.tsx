import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { chartColors } from './chartConstants';
import type { 
  Chart as ChartJS,
  ChartData, 
  ChartOptions,
  Scale,
  CoreScaleOptions,
  ScriptableContext,
  TooltipItem,
  CartesianScaleTypeRegistry
} from 'chart.js';

const DriversOfPerformance: React.FC = () => {
  // Risk-Adjusted Performance
  const RiskAdjustedPerformance: React.FC = () => {
    const data = {
      labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
      datasets: [
        {
          label: 'Equihome Fund I',
          data: [16.4, 16.8, 17.1, 16.6],
          borderColor: chartColors.lineColors.primary,
          backgroundColor: 'rgba(30, 64, 175, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Commercial Real Estate',
          data: [12.2, 12.5, 12.8, 12.4],
          borderColor: chartColors.lineColors.secondary,
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'ASX REIT Index',
          data: [8.4, 8.7, 8.9, 8.5],
          borderColor: chartColors.lineColors.tertiary,
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Fixed Income',
          data: [4.2, 4.5, 4.7, 4.4],
          borderColor: '#DC2626',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
        }
      ]
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          align: 'start' as const,
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<'line'>) => {
              return `${context.dataset.label}: ${context.raw}% IRR`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'linear' as const,
          beginAtZero: true,
          max: 20,
          ticks: {
            callback: (value: number | string) => `${value}%`
          },
          title: {
            display: true,
            text: 'Internal Rate of Return (IRR)',
            color: '#64748B'
          }
        }
      }
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Comparative Performance Analysis</h3>
            <p className="text-xs text-gray-500 mt-1">
              IRR comparison across different asset classes
            </p>
          </div>
        </div>
        <div className="h-[300px]">
          <Line data={data} options={options} />
        </div>
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h4 className="text-xs font-medium text-gray-900 mb-2">Performance Highlights:</h4>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>• <span className="font-medium">Equihome Fund I (16.6%):</span> Consistently outperforming all comparable asset classes</li>
            <li>• <span className="font-medium">Commercial Real Estate (12.4%):</span> Traditional property investment returns</li>
            <li>• <span className="font-medium">ASX REIT Index (8.5%):</span> Listed property market performance</li>
            <li>• <span className="font-medium">Fixed Income (4.4%):</span> Conservative investment benchmark</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Our fund demonstrates superior returns while maintaining a conservative risk profile through our selective lending strategy.
          </p>
        </div>
      </div>
    );
  };

  // Sydney Market Performance
  const SydneyMarketPerformance: React.FC = () => {
    const data = {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Portfolio Growth',
          data: [8.2, 7.9, 9.1, 8.7, 8.4, 8.8],
          borderColor: chartColors.lineColors.primary,
          backgroundColor: 'rgba(30, 64, 175, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Sydney Metro Average',
          data: [6.1, 5.8, 6.5, 6.2, 6.0, 6.3],
          borderColor: chartColors.lineColors.secondary,
          borderDash: [5, 5],
          tension: 0.4,
          fill: false,
        }
      ]
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear' as const,
          beginAtZero: true,
          ticks: {
            callback: (value: number | string) => `${value}%`
          }
        }
      }
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Sydney Market Performance</h3>
        <div className="h-[300px]">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  // AI/ML Success Metrics
  const AIMLSuccessMetrics: React.FC = () => {
    const data = {
      labels: ['Property Valuation', 'Growth Prediction', 'Risk Assessment', 'Market Timing'],
      datasets: [{
        label: 'Model Accuracy',
        data: [96, 92, 94, 89],
        backgroundColor: 'rgba(30, 64, 175, 0.8)',
        borderRadius: 6,
      }]
    };

    const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear' as const,
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value: number | string) => `${value}%`
          }
        }
      }
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">AI/ML Success Metrics</h3>
        <div className="h-[300px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };

  // Underwriting Performance
  const UnderwritingPerformance: React.FC = () => {
    const data = {
      labels: ['Deal 1', 'Deal 2', 'Deal 3', 'Deal 4', 'Deal 5', 'Deal 6', 'Deal 7', 'Deal 8'],
      datasets: [
        {
          label: 'Projected IRR',
          data: [15.2, 14.8, 15.5, 15.0, 14.9, 15.3, 15.1, 15.4],
          borderColor: chartColors.lineColors.secondary,
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointStyle: 'circle',
        },
        {
          label: 'Actual IRR',
          data: [16.4, 16.1, 16.8, 16.2, 16.5, 16.9, 16.3, 16.7],
          borderColor: chartColors.lineColors.primary,
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointStyle: 'circle',
        }
      ]
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear' as const,
          beginAtZero: true,
          ticks: {
            callback: (value: number | string) => `${value}%`
          }
        }
      }
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Underwriting Performance</h3>
        <div className="h-[300px]">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  // Strategy Implementation
  const StrategyImplementation: React.FC = () => {
    const data = {
      labels: ['Geographic Focus', 'Risk Management', 'Deal Selection', 'Portfolio Balance'],
      datasets: [{
        data: [95, 98, 92, 94],
        backgroundColor: [
          'rgba(30, 64, 175, 0.8)',
          'rgba(4, 120, 87, 0.8)',
          'rgba(124, 58, 237, 0.8)',
          'rgba(220, 38, 38, 0.8)'
        ],
        borderRadius: 6,
      }]
    };

    const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          type: 'linear' as const,
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value: number | string) => `${value}%`
          }
        }
      }
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Strategy Implementation</h3>
        <div className="h-[300px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <RiskAdjustedPerformance />
      <SydneyMarketPerformance />
      <div className="grid grid-cols-2 gap-6">
        <AIMLSuccessMetrics />
        <UnderwritingPerformance />
      </div>
      <StrategyImplementation />
    </div>
  );
};

export default DriversOfPerformance; 