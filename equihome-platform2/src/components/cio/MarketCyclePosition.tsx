import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const mockData = {
  labels: ['Recovery', 'Expansion', 'Peak', 'Contraction'],
  datasets: [
    {
      data: [25, 35, 25, 15],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',  // Recovery - Teal
        'rgba(54, 162, 235, 0.8)',  // Expansion - Blue
        'rgba(255, 206, 86, 0.8)',  // Peak - Yellow
        'rgba(255, 99, 132, 0.8)',  // Contraction - Red
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Market Cycle Position',
    },
  },
};

const MarketCyclePosition: React.FC = () => {
  return (
    <div className="p-4">
      <Doughnut data={mockData} options={options} />
      <div className="mt-4 text-center text-sm text-gray-600">
        Current Position: Expansion Phase
      </div>
    </div>
  );
};

export default MarketCyclePosition; 