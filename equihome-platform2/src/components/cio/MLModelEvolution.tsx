import React from 'react';
import { Line } from 'react-chartjs-2';

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Model Accuracy',
      data: [0.82, 0.85, 0.87, 0.89, 0.91, 0.92],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'F1 Score',
      data: [0.79, 0.81, 0.84, 0.86, 0.88, 0.90],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const
    },
    title: {
      display: true,
      text: 'ML Model Evolution'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1,
      title: {
        display: true,
        text: 'Score'
      }
    }
  }
};

const MLModelEvolution: React.FC = () => {
  return (
    <div className="p-4">
      <Line data={mockData} options={options} />
      <div className="mt-4 text-center text-sm text-gray-600">
        Latest Model Version: 2.3.0
      </div>
    </div>
  );
};

export default MLModelEvolution; 