import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import type { Deal } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  deal: Deal;
}

const ReturnProjections: React.FC<Props> = ({ deal }) => {
  if (!deal?.returns?.yearlyBreakdown) {
    return null;
  }

  // Get the exact underwrite year and ROI from the deal data
  const underwriteYear = deal.returns.optimalExit.year;
  const underwriteRoi = deal.returns.optimalExit.roi;
  
  const data: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Returns Profile',
        data: deal.returns.yearlyBreakdown.map((y, index) => ({
          x: index + 1, // Adjust x to match actual years (1-based)
          y: y.roi
        })),
        backgroundColor: '#3B82F6',
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Underwrite',
        data: [{
          x: underwriteYear,
          y: underwriteRoi
        }],
        backgroundColor: '#DC2626',
        borderColor: '#991B1B',
        borderWidth: 2,
        pointRadius: 14,
        pointHoverRadius: 16,
        pointStyle: 'star'
      }
    ]
  };

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'RETURNS PROFILE',
        font: {
          size: 20,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw as { x: number; y: number };
            const isUnderwrite = context.datasetIndex === 1;
            return `${isUnderwrite ? 'Underwrite: ' : 'Year '} ${point.x}: ${point.y.toFixed(2)}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: true,
        },
        ticks: {
          callback: (value) => `Year ${value}`,
          stepSize: 1,
          font: {
            size: 12
          }
        },
        min: 1, // Start from Year 1
        max: deal.returns.yearlyBreakdown.length // End at max year
      },
      y: {
        grid: {
          display: true,
          drawBorder: true,
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            size: 12
          },
          stepSize: 5
        },
        min: 0,
        max: 30,
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="h-[500px]">
        <Scatter data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 mt-4 text-center italic">
        This shows the return profile as a singular event and return based on when a homeowner exits.
      </p>
    </div>
  );
};

export default ReturnProjections;