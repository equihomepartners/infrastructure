import React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatNumber } from '../../utils/formatters';

interface SuburbComparisonProps {
  suburb: string | null;
  analysis: any | null;
  isLoading?: boolean;
}

const SuburbComparison: React.FC<SuburbComparisonProps> = ({ suburb, analysis, isLoading = false }) => {
  const defaultData = {
    labels: ['Price Growth', 'Rental Yield', 'Infrastructure', 'Schools', 'Transport'],
    datasets: [{
      label: 'Current Suburb',
      data: [0, 0, 0, 0, 0],
      backgroundColor: 'rgba(148, 163, 184, 0.2)',
      borderColor: 'rgb(148, 163, 184)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      }
    }
  };

  const metrics = analysis?.metrics || {};
  
  const chartData = {
    labels: ['Price Growth', 'Rental Yield', 'Infrastructure', 'Schools', 'Transport'],
    datasets: [
      {
        label: suburb || 'Selected Suburb',
        data: [
          metrics.priceGrowth || 0,
          metrics.rentalYield || 0,
          metrics.infrastructure || 0,
          metrics.schools || 0,
          metrics.transport || 0
        ],
        backgroundColor: analysis ? 'rgba(59, 130, 246, 0.5)' : 'rgba(148, 163, 184, 0.2)',
        borderColor: analysis ? 'rgb(59, 130, 246)' : 'rgb(148, 163, 184)',
        borderWidth: 1
      },
      {
        label: 'Sydney Average',
        data: [65, 48, 72, 58, 62], // Example averages
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        borderColor: 'rgb(234, 179, 8)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Suburb Comparison</h3>
      
      {!suburb && (
        <div className="text-sm text-gray-500 mb-4">
          Select a suburb to view comparison metrics
        </div>
      )}

      <div className="space-y-6">
        {/* Comparison Chart */}
        <div className="h-64">
          <Bar data={analysis ? chartData : defaultData} options={chartOptions} />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Overall Score</div>
            <div className="text-2xl font-semibold text-gray-900">
              {analysis ? formatNumber.percentage(metrics.overall || 0) : '--'}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Market Position</div>
            <div className="text-2xl font-semibold text-gray-900">
              {analysis ? `#${formatNumber.score(metrics.marketPosition || 0)}` : '--'}
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Price Growth', key: 'priceGrowth', format: formatNumber.percentage },
            { label: 'Rental Yield', key: 'rentalYield', format: formatNumber.percentage },
            { label: 'Infrastructure', key: 'infrastructure', format: formatNumber.score },
            { label: 'Schools', key: 'schools', format: formatNumber.score },
            { label: 'Transport', key: 'transport', format: formatNumber.score },
            { label: 'Market Strength', key: 'marketStrength', format: formatNumber.score }
          ].map(({ label, key, format }) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{label}</div>
              <div className="text-xl font-semibold text-gray-900">
                {analysis ? format(metrics[key] || 0) : '--'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuburbComparison; 