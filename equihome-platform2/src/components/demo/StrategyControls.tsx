import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Brain, Target, Shield, TrendingUp } from 'lucide-react';

const StrategyControls: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Strategy Presets Section */}
      <div className="mb-8 space-y-4">
        {/* ML-Optimized Strategy */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-2">
            <h5 className="font-medium text-blue-900">ML-Optimized Strategy</h5>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-sm text-blue-800 mb-3">
            Data-driven allocation balancing premium and growth areas. Dynamic LTV and zone strategy based on real-time market analysis.
          </p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-blue-700">Target Return:</span>
              <span className="ml-2 font-medium">22%</span>
            </div>
            <div>
              <span className="text-blue-700">Risk Level:</span>
              <span className="ml-2 font-medium">Medium</span>
            </div>
            <div>
              <span className="text-blue-700">Green Zone:</span>
              <span className="ml-2 font-medium">75%</span>
            </div>
          </div>
        </div>

        {/* Growth Corridors Strategy */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <h5 className="font-medium text-gray-900">Growth Corridors</h5>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">High Growth</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Target emerging growth corridors with infrastructure development. Higher LTVs balanced with strong growth potential.
          </p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Target Return:</span>
              <span className="ml-2 font-medium">28%</span>
            </div>
            <div>
              <span className="text-gray-600">Risk Level:</span>
              <span className="ml-2 font-medium">High</span>
            </div>
            <div>
              <span className="text-gray-600">Green Zone:</span>
              <span className="ml-2 font-medium">50%</span>
            </div>
          </div>
        </div>

        {/* Premium Suburbs Strategy */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <h5 className="font-medium text-gray-900">Premium Suburbs</h5>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Conservative</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Focus on established premium locations with strong fundamentals. Lower LTV ratios provide additional buffer against market cycles.
          </p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Target Return:</span>
              <span className="ml-2 font-medium">15%</span>
            </div>
            <div>
              <span className="text-gray-600">Risk Level:</span>
              <span className="ml-2 font-medium">Low</span>
            </div>
            <div>
              <span className="text-gray-600">Green Zone:</span>
              <span className="ml-2 font-medium">90%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Strategy Parameters */}
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
            <Brain className="h-4 w-4 mr-1" />
            ML Strategy Analysis
          </h4>
          <ul className="space-y-2 text-sm text-green-700">
            <li className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              ML models predict 22% optimal returns with current market conditions
            </li>
            <li className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Balanced risk profile provides optimal risk-adjusted returns
            </li>
            <li className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              75/20/5 zone allocation recommended for current market cycle
            </li>
          </ul>
        </div>

        {/* Zone Allocation */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Current Zone Allocation</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-gray-600">Green Zone</label>
                <span className="text-xs text-gray-600">75%</span>
              </div>
              <Slider defaultValue={[75]} max={100} min={0} step={1} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-gray-600">Orange Zone</label>
                <span className="text-xs text-gray-600">20%</span>
              </div>
              <Slider defaultValue={[20]} max={100} min={0} step={1} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-gray-600">Red Zone</label>
                <span className="text-xs text-gray-600">5%</span>
              </div>
              <Slider defaultValue={[5]} max={100} min={0} step={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyControls; 