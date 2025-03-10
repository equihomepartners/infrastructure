import React from 'react';
import { Brain, AlertTriangle } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface RiskCorrelation {
  factor1: string;
  factor2: string;
  correlation: number;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

interface RiskCorrelationMatrixProps {
  analysis: any | null;
  isLoading?: boolean;
}

const correlationData: RiskCorrelation[] = [
  {
    factor1: 'Location Quality',
    factor2: 'Price Stability',
    correlation: 0.85,
    impact: 'high',
    confidence: 92
  },
  {
    factor1: 'Market Liquidity',
    factor2: 'Infrastructure',
    correlation: 0.78,
    impact: 'high',
    confidence: 89
  },
  {
    factor1: 'Employment Stability',
    factor2: 'Price Growth',
    correlation: 0.72,
    impact: 'medium',
    confidence: 87
  },
  {
    factor1: 'Development Activity',
    factor2: 'Transport Access',
    correlation: 0.68,
    impact: 'medium',
    confidence: 85
  }
];

const RiskCorrelationMatrix: React.FC<RiskCorrelationMatrixProps> = ({ analysis, isLoading = false }) => {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Correlation Matrix</h3>
      <div className="space-y-4">
        {correlationData.map((correlation, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-4 w-4 ${
                  correlation.impact === 'high' ? 'text-red-500' :
                  correlation.impact === 'medium' ? 'text-orange-500' :
                  'text-yellow-500'
                }`} />
                <span className="font-medium">{correlation.factor1} → {correlation.factor2}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                correlation.impact === 'high' ? 'bg-red-100 text-red-800' :
                correlation.impact === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {correlation.impact.toUpperCase()} IMPACT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Correlation Strength</div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      correlation.correlation > 0.8 ? 'bg-red-500' :
                      correlation.correlation > 0.7 ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${correlation.correlation * 100}%` }}
                  />
                </div>
                <div className="text-sm font-medium mt-1">
                  {formatNumber.percentage(correlation.correlation * 100)}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">ML Confidence</div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${correlation.confidence}%` }}
                  />
                </div>
                <div className="text-sm font-medium mt-1">{correlation.confidence}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-red-800">High Impact</div>
          <div className="text-xs text-red-600 mt-1">
            Strong correlation (&gt;80%)
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-orange-800">Medium Impact</div>
          <div className="text-xs text-orange-600 mt-1">
            Moderate correlation (70-80%)
          </div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-yellow-800">Low Impact</div>
          <div className="text-xs text-yellow-600 mt-1">
            Weak correlation (&lt;70%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCorrelationMatrix; 