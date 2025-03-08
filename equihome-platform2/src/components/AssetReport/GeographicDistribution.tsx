import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { sampleDeals } from '../../data/sampleDeals';

const GeographicDistribution: React.FC = () => {
  // Calculate suburb distribution from sample deals
  const suburbDistribution = useMemo(() => {
    const distribution = sampleDeals.reduce((acc, deal) => {
      acc[deal.suburb] = (acc[deal.suburb] || 0) + deal.loanAmount;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by amount
    return Object.entries(distribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5); // Top 5 suburbs
  }, []);

  const data = {
    labels: suburbDistribution.map(([suburb]) => suburb),
    datasets: [
      {
        data: suburbDistribution.map(([, amount]) => Math.round(amount / 1000)), // Convert to millions
        backgroundColor: '#2563EB',
        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  // Calculate zone percentages
  const zoneDistribution = useMemo(() => {
    const total = sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);
    
    const byZone = sampleDeals.reduce((acc, deal) => {
      const zone = deal.propertyDetails.trafficLight;
      acc[zone] = (acc[zone] || 0) + deal.loanAmount;
      return acc;
    }, {} as Record<string, number>);

    return {
      green: Math.round((byZone['Green'] || 0) / total * 100),
      orange: Math.round((byZone['Orange'] || 0) / total * 100),
      red: Math.round((byZone['Red'] || 0) / total * 100)
    };
  }, []);

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          callback: (value: number) => `$${value}mm`,
          font: {
            size: 14
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  };

  return (
    <div className="space-y-16">
      <div className="bg-gray-50 p-12 rounded-xl">
        <div className="max-w-3xl mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Assets are diversified across premium suburbs
          </h3>
          <p className="text-gray-600">
            Geographic diversification across Sydney's premium suburbs enables Equihome to 
            originate residential real estate option contracts without excessive risk.
          </p>
        </div>
        <div className="h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <h3 className="text-xl font-semibold text-gray-900">Green Zone</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{zoneDistribution.green}%</div>
          <p className="text-gray-600">Portfolio concentration</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <h3 className="text-xl font-semibold text-gray-900">Orange Zone</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">{zoneDistribution.orange}%</div>
          <p className="text-gray-600">Portfolio concentration</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <h3 className="text-xl font-semibold text-gray-900">Red Zone</h3>
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">{zoneDistribution.red}%</div>
          <p className="text-gray-600">Portfolio concentration</p>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;