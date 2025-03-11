import React from 'react';
import MLEnhancedMap from './MLEnhancedMap';
import MLAnalytics from './MLAnalytics';
import MLDecisionViz from './MLDecisionViz';
import SuburbComparison from './SuburbComparison';
import MLSystemHeader from './MLSystemHeader';
import UnderwritingIntegration from './UnderwritingIntegration';
import RiskCorrelationMatrix from './RiskCorrelationMatrix';
import MarketCyclePosition from './MarketCyclePosition';
import { Brain, TrendingUp, Shield, ArrowLeftRight, Map, AlertTriangle, Settings, Loader2, XCircle } from 'lucide-react';
import MLModelEvolution from './MLModelEvolution';

interface TrafficLightZonesProps {
  onTabChange?: (tab: string) => void;
}

const mockAnalysis = {
  confidence: 0.92,
  zone: 'green',
  metrics: {
    growth: 85,
    risk: 25,
    infrastructure: 90,
    development: 'High',
    transport: 85,
    schools: 90,
    marketMetrics: {
      medianPrice: 2500000,
      priceGrowth: 12.5,
      rentalYield: 3.8
    },
    historicalGrowth: [5, 7, 8, 10, 12],
    forecastGrowth: [13, 14, 15, 16, 17]
  },
  predictions: {
    shortTerm: {
      prediction: 'Strong growth expected',
      confidence: 0.9,
      factors: ['Infrastructure development', 'Population growth', 'Low supply']
    },
    mediumTerm: {
      prediction: 'Sustained growth',
      confidence: 0.85,
      factors: ['Economic indicators', 'Employment growth']
    },
    longTerm: {
      prediction: 'Stable returns',
      confidence: 0.8,
      factors: ['Market maturity', 'Area establishment']
    }
  },
  lastUpdated: new Date(),
  iteration: 245,
  dataPoints: 15234,
  modelVersion: '2.1.0',
  updateMetrics: {
    confidence: 92,
    dataQuality: 95,
    predictionAccuracy: 94
  },
  insights: [
    'Strong infrastructure development pipeline',
    'Growing professional demographic',
    'Limited new supply in pipeline'
  ],
  growthAnalysis: {
    labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
    datasets: [{
      label: 'Metrics',
      data: [85, 25, 90, 85, 90],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  }
};

const TrafficLightZones: React.FC<TrafficLightZonesProps> = ({ onTabChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">ML-Enhanced Map View</h3>
            <div className="h-[600px]">
              <MLEnhancedMap />
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">ML Analytics</h3>
            <MLAnalytics analysis={mockAnalysis} />
          </div>
        </div>
      </div>

      {/* Decision Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Decision Visualization</h3>
          <MLDecisionViz analysis={mockAnalysis} />
        </div>

        {/* Risk Correlation */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Risk Correlation</h3>
          <RiskCorrelationMatrix />
        </div>
      </div>

      {/* Market Cycle and Model Evolution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Market Cycle Position</h3>
          <MarketCyclePosition />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">ML Model Evolution</h3>
          <MLModelEvolution />
        </div>
      </div>
    </div>
  );
};

export default TrafficLightZones;