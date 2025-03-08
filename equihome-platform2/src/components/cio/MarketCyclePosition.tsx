import React from 'react';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface Props {
  suburb: string;
  analysis: any;
}

interface MarketCycleIndicator {
  phase: 'growth' | 'peak' | 'correction' | 'recovery';
  confidence: number;
  timeInPhase: number;
  predictedDuration: number;
  zoneImpact: Record<'green' | 'orange' | 'red', {
    riskLevel: number;
    opportunityScore: number;
    recommendedActions: string[];
  }>;
}

const MarketCyclePosition: React.FC<Props> = ({ suburb, analysis }) => {
  const cycleData: MarketCycleIndicator = {
    phase: analysis.metrics.growth > 7 ? 'growth' :
           analysis.metrics.growth > 5 ? 'peak' :
           analysis.metrics.growth > 3 ? 'correction' : 'recovery',
    confidence: analysis.confidence,
    timeInPhase: Math.floor(Math.random() * 6) + 3,
    predictedDuration: 14,
    zoneImpact: {
      green: {
        riskLevel: analysis.metrics.risk * 0.8,
        opportunityScore: analysis.metrics.growth * 1.2,
        recommendedActions: [
          `Maintain current exposure in ${suburb}`,
          'Focus on premium properties',
          'Monitor price growth sustainability'
        ]
      },
      orange: {
        riskLevel: analysis.metrics.risk,
        opportunityScore: analysis.metrics.growth,
        recommendedActions: [
          'Selective opportunities',
          'Enhanced due diligence',
          'Focus on growth corridors'
        ]
      },
      red: {
        riskLevel: analysis.metrics.risk * 1.2,
        opportunityScore: analysis.metrics.growth * 0.8,
        recommendedActions: [
          'Limit new exposure',
          'Increase risk buffers',
          'Focus on strong fundamentals'
        ]
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Market Cycle Position</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {cycleData.timeInPhase} months in current phase
          </span>
        </div>
      </div>

      {/* Current Phase */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-blue-800">Current Phase: {cycleData.phase.toUpperCase()}</span>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {formatNumber.percentage(cycleData.confidence)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <div className="text-sm text-blue-800">Time in Phase</div>
            <div className="h-2 bg-blue-200 rounded-full mt-1">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(cycleData.timeInPhase / cycleData.predictedDuration) * 100}%` }}
              />
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {cycleData.timeInPhase} / {cycleData.predictedDuration} months
            </div>
          </div>
          <div>
            <div className="text-sm text-blue-800">Phase Progress</div>
            <div className="h-2 bg-blue-200 rounded-full mt-1">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(cycleData.timeInPhase / cycleData.predictedDuration) * 100}%` }}
              />
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {Math.round((cycleData.timeInPhase / cycleData.predictedDuration) * 100)}% complete
            </div>
          </div>
        </div>
      </div>

      {/* Zone Impact */}
      <div className="space-y-4">
        {(Object.entries(cycleData.zoneImpact) as [keyof typeof cycleData.zoneImpact, typeof cycleData.zoneImpact[keyof typeof cycleData.zoneImpact]][]).map(([zone, impact]) => (
          <div key={zone} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium capitalize">{zone} Zone Impact</span>
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-4 w-4 ${
                  impact.riskLevel > 60 ? 'text-red-500' :
                  impact.riskLevel > 40 ? 'text-orange-500' :
                  'text-green-500'
                }`} />
                <span className="text-sm">Risk Level: {formatNumber.shortPercentage(impact.riskLevel)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-600">Risk Level</div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full ${
                      impact.riskLevel > 60 ? 'bg-red-500' :
                      impact.riskLevel > 40 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${impact.riskLevel}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Opportunity Score</div>
                <div className="text-lg font-semibold">
                  {formatNumber.shortPercentage(impact.opportunityScore)}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {impact.recommendedActions.map((action, index) => (
                <div key={index} className="text-sm flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    zone === 'green' ? 'bg-green-500' :
                    zone === 'orange' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`} />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketCyclePosition; 