import React from 'react';
import { Line } from 'react-chartjs-2';
import { commonOptions } from '../fund/ChartConfig';

const MarketAnalysis: React.FC = () => {
  const globalComparisonData = {
    labels: ['2004', '2006', '2008', '2010', '2012', '2014', '2016', '2018', '2020', '2022'],
    datasets: [
      {
        label: 'Sydney',
        data: [1.0, 0.95, 1.1, 1.2, 1.4, 1.6, 1.8, 1.9, 2.2, 2.6],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'San Francisco',
        data: [1.0, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9, 2.0, 2.1],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'New York',
        data: [1.0, 1.1, 1.2, 1.25, 1.3, 1.4, 1.5, 1.6, 1.8, 2.0],
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        tension: 0.4
      },
      {
        label: 'Hong Kong',
        data: [1.0, 1.4, 1.8, 2.0, 2.4, 2.8, 3.2, 3.3, 2.9, 2.7],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      }
    ]
  };

  const priceData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Sydney Premium Suburbs',
        data: [1150000, 1220000, 1410000, 1590000, 1680000, 1750000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Melbourne Premium Suburbs',
        data: [902000, 936000, 1040000, 1120000, 1190000, 1240000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  return (
    <section className="space-y-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Global Market Position</h3>
        <div className="prose max-w-none mb-8">
          <p className="text-gray-600 leading-relaxed">
            Sydney's real estate market stands among the world's leading property markets, demonstrating 
            consistent growth and resilience. With a compound annual growth rate (CAGR) of 5% over the 
            past 20 years, Sydney's market performance rivals other global financial centers while 
            maintaining more stable appreciation patterns.
          </p>
        </div>

        <div className="h-[400px] mb-8">
          <Line 
            data={globalComparisonData} 
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: {
                  display: true,
                  text: 'Global Real Estate Market Index (2004 = 1.0)',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              }
            }} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total Dwellings</div>
            <div className="text-2xl font-bold">1,162,719</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Median House Price</div>
            <div className="text-2xl font-bold">~$900,000</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">20-Year CAGR</div>
            <div className="text-2xl font-bold">5.0%</div>
          </div>
        </div>
      </div>

      {/* Rest of the existing Market Analysis content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Overview</h3>
        <div className="prose max-w-none mb-8">
          <p className="text-gray-600 leading-relaxed">
            The Australian residential property market continues to demonstrate robust fundamentals, 
            with Sydney leading the nation in both median house prices and growth rates. The combination 
            of limited housing supply, strong population growth, and sustained economic performance has 
            created an environment where property values have shown remarkable resilience and growth potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Market Indicators</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Growth Rate</span>
                  <span className="font-semibold text-green-600">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Median House Price</span>
                  <span className="font-semibold">$1.75M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Yield</span>
                  <span className="font-semibold">3.8%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Market Dynamics</h4>
              <ul className="space-y-3 text-gray-600">
                <li>• Strong demand in premium suburbs</li>
                <li>• Limited housing supply</li>
                <li>• High rental yields in key areas</li>
                <li>• Growing infrastructure investment</li>
              </ul>
            </div>
          </div>

          <div className="h-[400px]">
            <Line 
              data={priceData} 
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  title: {
                    display: true,
                    text: 'Premium Suburb Price Trends',
                    font: {
                      size: 16,
                      weight: 'bold'
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Rest of the existing content remains the same */}
    </section>
  );
};

export default MarketAnalysis;