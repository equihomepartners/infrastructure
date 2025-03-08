import React, { useState } from 'react';
import { Target, Sliders, Map, TrendingUp } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  active: boolean;
  metrics: {
    targetReturn: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    timeHorizon: string;
  };
}

const FundStrategy: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: 'conservative',
      name: 'Conservative Growth',
      description: 'Focus on stable, low-risk properties in established areas with strong fundamentals',
      active: true,
      metrics: {
        targetReturn: 12,
        riskLevel: 'Low',
        timeHorizon: '5-7 years'
      }
    },
    {
      id: 'balanced',
      name: 'Balanced Opportunity',
      description: 'Mix of established and growth areas, moderate risk profile with higher return potential',
      active: false,
      metrics: {
        targetReturn: 18,
        riskLevel: 'Medium',
        timeHorizon: '3-5 years'
      }
    },
    {
      id: 'aggressive',
      name: 'High Growth',
      description: 'Target emerging areas with significant appreciation potential, higher risk tolerance',
      active: false,
      metrics: {
        targetReturn: 25,
        riskLevel: 'High',
        timeHorizon: '2-3 years'
      }
    }
  ]);

  const toggleStrategy = (id: string) => {
    setStrategies(strategies.map(strategy => ({
      ...strategy,
      active: strategy.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {strategies.map(strategy => (
          <div 
            key={strategy.id}
            className={`bg-white rounded-lg shadow-sm p-6 border-2 transition-colors ${
              strategy.active 
                ? 'border-indigo-500' 
                : 'border-transparent hover:border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
              <button
                onClick={() => toggleStrategy(strategy.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  strategy.active
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {strategy.active ? 'Active' : 'Select'}
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4">{strategy.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Target Return</span>
                <span className="font-medium">{strategy.metrics.targetReturn}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Risk Level</span>
                <span className={`font-medium ${
                  strategy.metrics.riskLevel === 'Low' 
                    ? 'text-green-600'
                    : strategy.metrics.riskLevel === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>{strategy.metrics.riskLevel}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Time Horizon</span>
                <span className="font-medium">{strategy.metrics.timeHorizon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Investment Criteria</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Property Types</div>
              <div className="font-medium">Single Family Homes</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Location Preferences</div>
              <div className="font-medium">90% Green Zone, 10% Orange Zone</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Value Range</div>
              <div className="font-medium">$1M - $5M</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Sliders className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Risk Management</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Maximum LTV</div>
              <div className="font-medium">75%</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Geographic Concentration</div>
              <div className="font-medium">Max 25% per suburb</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Property Type Mix</div>
              <div className="font-medium">100% Single Family</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundStrategy;