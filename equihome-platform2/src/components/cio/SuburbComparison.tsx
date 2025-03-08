import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { getSuburbAnalysis, getSydneyAverages, getZoneAverages } from '../../services/mlAnalytics';
import { Clock, TrendingUp, RefreshCcw } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface Props {
  suburbs: string[];
}

const SuburbComparison: React.FC<Props> = ({ suburbs }) => {
  const analyses = suburbs.map(suburb => ({
    suburb,
    analysis: getSuburbAnalysis(suburb)
  }));
  
  const sydneyAverages = getSydneyAverages();
  const zoneAverages = getZoneAverages();

  // Historical and Forecast Data (12 months back, current, 12 months forward)
  const timeLabels = [
    '-12m', '-9m', '-6m', '-3m', 'Current', '+3m', '+6m', '+9m', '+12m'
  ];

  const growthComparisonData = {
    labels: timeLabels,
    datasets: [
      // Selected Suburb
      {
        label: suburbs[0],
        data: analyses[0].analysis.metrics.historicalGrowth.concat(
          [analyses[0].analysis.metrics.growth],
          analyses[0].analysis.metrics.forecastGrowth
        ),
        borderColor: '#3b82f6',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      // Zone Averages
      {
        label: 'Green Zone Avg',
        data: zoneAverages.green.historicalGrowth.concat(
          [zoneAverages.green.currentGrowth],
          zoneAverages.green.forecastGrowth
        ),
        borderColor: '#22c55e',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false
      },
      {
        label: 'Orange Zone Avg',
        data: zoneAverages.orange.historicalGrowth.concat(
          [zoneAverages.orange.currentGrowth],
          zoneAverages.orange.forecastGrowth
        ),
        borderColor: '#f97316',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false
      },
      {
        label: 'Red Zone Avg',
        data: zoneAverages.red.historicalGrowth.concat(
          [zoneAverages.red.currentGrowth],
          zoneAverages.red.forecastGrowth
        ),
        borderColor: '#ef4444',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false
      },
      // Sydney Average
      {
        label: 'Sydney Average',
        data: sydneyAverages.historicalGrowth.concat(
          [sydneyAverages.currentGrowth],
          sydneyAverages.forecastGrowth
        ),
        borderColor: '#94a3b8',
        borderWidth: 2,
        borderDash: [2, 2],
        tension: 0.4,
        fill: false
      }
    ]
  };

  // Metrics Comparison Data
  const compareData = {
    labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
    datasets: [
      // Sydney average
      {
        label: 'Sydney Average',
        data: [
          sydneyAverages.growth,
          sydneyAverages.risk,
          sydneyAverages.infrastructure,
          sydneyAverages.transport,
          sydneyAverages.schools
        ],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      // Zone averages
      {
        label: 'Zone Average',
        data: [
          zoneAverages[analyses[0].analysis.zone].currentGrowth,
          zoneAverages[analyses[0].analysis.zone].risk,
          zoneAverages[analyses[0].analysis.zone].infrastructure,
          zoneAverages[analyses[0].analysis.zone].transport,
          zoneAverages[analyses[0].analysis.zone].schools
        ],
        borderColor: analyses[0].analysis.zone === 'green' ? '#22c55e' :
                    analyses[0].analysis.zone === 'orange' ? '#f97316' : '#ef4444',
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      // Selected suburb
      {
        label: suburbs[0],
        data: [
          analyses[0].analysis.metrics.growth,
          analyses[0].analysis.metrics.risk,
          analyses[0].analysis.metrics.infrastructure,
          analyses[0].analysis.metrics.transport,
          analyses[0].analysis.metrics.schools
        ],
        borderColor: '#3b82f6',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Growth Comparison Chart */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Growth Trajectory Comparison</h3>
        <div className="h-80">
          <Line 
            data={growthComparisonData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${formatNumber.percentage(context.parsed.y)}`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Growth Rate (%)'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Metrics Comparison */}
      <div className="bg-white rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Metrics Comparison</h3>
        <div className="h-80">
          <Line 
            data={compareData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${formatNumber.percentage(context.parsed.y)}`
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Metric</th>
              <th className="text-left py-2">Sydney Average</th>
              <th className="text-left py-2">Zone Average</th>
              <th className="text-left py-2">{suburbs[0]}</th>
              <th className="text-left py-2">Variance</th>
            </tr>
          </thead>
          <tbody>
            {/* Price Metrics */}
            <tr className="border-b">
              <td className="py-2">Median Price</td>
              <td className="py-2">{formatNumber.currency(sydneyAverages.medianPrice)}</td>
              <td className="py-2">{formatNumber.currency(zoneAverages[analyses[0].analysis.zone].medianPrice)}</td>
              <td className="py-2">{formatNumber.currency(analyses[0].analysis.metrics.marketMetrics.medianPrice)}</td>
              <td className="py-2">
                <span className={`${
                  analyses[0].analysis.metrics.marketMetrics.medianPrice > sydneyAverages.medianPrice
                  ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatNumber.percentage(
                    (analyses[0].analysis.metrics.marketMetrics.medianPrice / sydneyAverages.medianPrice - 1) * 100
                  )}
                </span>
              </td>
            </tr>
            {/* Add more metrics rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuburbComparison; 