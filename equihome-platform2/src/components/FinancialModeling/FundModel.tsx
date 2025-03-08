import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle, DollarSign, TrendingUp, Building2, Percent } from 'lucide-react';
import Input from '../ui/input';

interface FundModelInputs {
  targetAUM: number;
  numberOfDeals: number;
  ltvDistribution: {
    min: number;
    max: number;
    mean: number;
    standardDev: number;
  };
  growthDistribution: {
    min: number;
    max: number;
    mean: number;
    standardDev: number;
  };
  propertyValueDistribution: {
    min: number;
    max: number;
    mean: number;
    standardDev: number;
  };
}

const FundModel: React.FC = () => {
  const [inputs, setInputs] = useState<FundModelInputs>({
    targetAUM: 500000000, // $500M
    numberOfDeals: 500,
    ltvDistribution: {
      min: 15,
      max: 75,
      mean: 30,
      standardDev: 10
    },
    growthDistribution: {
      min: 2,
      max: 12,
      mean: 6,
      standardDev: 2
    },
    propertyValueDistribution: {
      min: 1000000,
      max: 10000000,
      mean: 3000000,
      standardDev: 1000000
    }
  });

  // Calculate key metrics based on inputs
  const metrics = React.useMemo(() => {
    const averageDealSize = inputs.targetAUM / inputs.numberOfDeals;
    const weightedLTV = inputs.ltvDistribution.mean;
    const weightedGrowthRate = inputs.growthDistribution.mean;
    
    // Calculate portfolio returns over time (10 years)
    const yearlyReturns = Array.from({ length: 10 }, (_, year) => {
      const yearNum = year + 1;
      
      // Calculate interest returns
      const interestReturn = inputs.targetAUM * 0.05 * yearNum; // 5% interest rate
      
      // Calculate appreciation returns based on weighted growth rate
      const appreciationReturn = inputs.targetAUM * (weightedLTV / 100) * 
        (Math.pow(1 + weightedGrowthRate / 100, yearNum) - 1);
      
      // Calculate total return and IRR
      const totalReturn = interestReturn + appreciationReturn;
      const irr = (Math.pow((totalReturn + inputs.targetAUM) / inputs.targetAUM, 1 / yearNum) - 1) * 100;

      return {
        year: yearNum,
        interestReturn,
        appreciationReturn,
        totalReturn,
        irr
      };
    });

    return {
      averageDealSize,
      weightedLTV,
      weightedGrowthRate,
      yearlyReturns
    };
  }, [inputs]);

  // Prepare chart data
  const returnData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [
      {
        label: 'Interest Returns',
        data: metrics.yearlyReturns.map(r => r.interestReturn / 1000000), // Convert to millions
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Appreciation Returns',
        data: metrics.yearlyReturns.map(r => r.appreciationReturn / 1000000), // Convert to millions
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  const irrData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [{
      label: 'Portfolio IRR',
      data: metrics.yearlyReturns.map(r => r.irr),
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => {
      const newInputs = { ...prev };
      if (field.includes('.')) {
        const [category, subfield] = field.split('.');
        (newInputs as any)[category][subfield] = value;
      } else {
        (newInputs as any)[field] = value;
      }
      return newInputs;
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Fund Model Parameters</h3>
            <p className="mt-2 text-yellow-700">
              This model simulates fund performance based on statistical distributions of key metrics.
              Adjust the parameters below to model different portfolio compositions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fund Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target AUM
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  formatNumber
                  value={inputs.targetAUM}
                  onChange={(value) => handleInputChange('targetAUM', value as number)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Deals
              </label>
              <Input
                type="number"
                value={inputs.numberOfDeals}
                onChange={(value) => handleInputChange('numberOfDeals', value as number)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">LTV Distribution</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Mean LTV (%)</label>
                  <Input
                    type="number"
                    value={inputs.ltvDistribution.mean}
                    onChange={(value) => handleInputChange('ltvDistribution.mean', value as number)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Std Dev (%)</label>
                  <Input
                    type="number"
                    value={inputs.ltvDistribution.standardDev}
                    onChange={(value) => handleInputChange('ltvDistribution.standardDev', value as number)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Growth Rate Distribution</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Mean Growth (%)</label>
                  <Input
                    type="number"
                    value={inputs.growthDistribution.mean}
                    onChange={(value) => handleInputChange('growthDistribution.mean', value as number)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Std Dev (%)</label>
                  <Input
                    type="number"
                    value={inputs.growthDistribution.standardDev}
                    onChange={(value) => handleInputChange('growthDistribution.standardDev', value as number)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Metrics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Average Deal Size</div>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">
                ${(metrics.averageDealSize / 1000000).toFixed(1)}M
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Weighted LTV</div>
                <Percent className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">
                {metrics.weightedLTV.toFixed(1)}%
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Growth Rate</div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">
                {metrics.weightedGrowthRate.toFixed(1)}%
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">10-Year IRR</div>
                <Building2 className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">
                {metrics.yearlyReturns[9].irr.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Return Components</h4>
            <div className="h-[200px]">
              <Line
                data={returnData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Returns ($M)'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Portfolio IRR</h4>
            <div className="h-[200px]">
              <Line
                data={irrData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'IRR (%)'
                      },
                      ticks: {
                        callback: (value: number) => `${value.toFixed(1)}%`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundModel;