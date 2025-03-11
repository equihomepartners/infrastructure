import React from 'react';
import { Line } from 'react-chartjs-2';

const mockData = {
  labels: ['Market Risk', 'Credit Risk', 'Interest Rate Risk', 'Operational Risk', 'Liquidity Risk'],
  datasets: [
    {
      label: 'Risk Correlation',
      data: [0.8, 0.6, 0.4, 0.3, 0.5],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Risk Correlation Matrix'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 1,
      title: {
        display: true,
        text: 'Correlation Coefficient'
      }
    }
  }
};

const RiskCorrelationMatrix: React.FC = () => {
  return (
    <div className="p-4">
      <Line data={mockData} options={options} />
    </div>
  );
};

export default RiskCorrelationMatrix; 