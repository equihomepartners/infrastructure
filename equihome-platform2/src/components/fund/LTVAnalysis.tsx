import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { sampleDeals } from '../../data/sampleDeals';
import './ChartConfig';

const LTVAnalysis: React.FC = () => {
  const weightedAverageLTV = 29.84; // This is our portfolio weighted average

  const data = {
    datasets: [
      {
        label: 'Property LTVs',
        data: sampleDeals.map((deal, index) => ({
          x: index,
          y: deal.ltv,
          label: deal.propertyDetails.address
        })),
        backgroundColor: '#3B82F6',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: 'Weighted Average LTV',
        data: sampleDeals.map((_, index) => ({
          x: index,
          y: weightedAverageLTV
        })),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: '#EF4444',
        pointRadius: 0,
        pointHitRadius: 0,
        showLine: true,
        borderDash: [5, 5]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio LTV by Property',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = context.raw;
            if (dataPoint.label) {
              return `${dataPoint.label}: ${dataPoint.y.toFixed(1)}% LTV`;
            }
            return `Portfolio Average: ${dataPoint.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        title: {
          display: true,
          text: 'LTV (%)'
        },
        ticks: {
          callback: (value: number) => `${value}%`
        }
      },
      x: {
        title: {
          display: true,
          text: 'Properties'
        },
        ticks: {
          callback: (value: number) => {
            const deal = sampleDeals[value];
            return deal ? deal.propertyDetails.address.split(',')[0] : '';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="h-[400px]">
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
};

export default LTVAnalysis;