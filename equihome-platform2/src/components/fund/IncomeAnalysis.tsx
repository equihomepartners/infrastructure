import React from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartConfig';

const IncomeAnalysis: React.FC = () => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Legal Fee',
        data: [6000, 10000, 0, 0, 0, 0],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Upfront Fee',
        data: [54000, 100500, 0, 0, 0, 0],
        backgroundColor: '#10B981',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Equihome Income',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default IncomeAnalysis;