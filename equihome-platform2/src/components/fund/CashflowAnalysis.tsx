import React from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartConfig';

const CashflowAnalysis: React.FC = () => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Total Cashflows',
        data: [-1740000, -3239500, 0, 0, 3592952, 6028540],
        backgroundColor: (context: any) => {
          const value = context.raw;
          return value >= 0 ? '#10B981' : '#EF4444';
        }
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
        text: 'Private Lending Cashflows',
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

export default CashflowAnalysis;