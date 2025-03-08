import React, { useState } from 'react';
import MLEnhancedMap from './MLEnhancedMap';
import MLAnalytics from './MLAnalytics';
import MLDecisionViz from './MLDecisionViz';
import SuburbComparison from './SuburbComparison';
import MLSystemHeader from './MLSystemHeader';
import UnderwritingIntegration from './UnderwritingIntegration';
import RiskCorrelationMatrix from './RiskCorrelationMatrix';
import MarketCyclePosition from './MarketCyclePosition';
import { getSuburbAnalysis } from '../../services/mlAnalytics';
import { Brain, TrendingUp, Shield, ArrowLeftRight, Map } from 'lucide-react';
import MLModelEvolution from './MLModelEvolution';

const TrafficLightZones: React.FC = () => {
  const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuburbSelect = async (suburb: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedSuburb(suburb);
      const suburbAnalysis = getSuburbAnalysis(suburb);
      setAnalysis(suburbAnalysis);
      setIsLoading(false);
    }, 500); // Simulate loading
  };

  return (
    <div className="space-y-6">
      {/* ML System Status Header - Always visible */}
      <MLSystemHeader />

      {/* ML Model Evolution - Shows the progression of our ML system */}
      <MLModelEvolution />

      {/* Map and Analysis Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Map Section - 2/3 width */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Map className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-bold">ML-Powered Zoning Analysis</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">
                ML System Active
              </span>
            </div>
          </div>
          <MLEnhancedMap onSuburbSelect={handleSuburbSelect} />
        </div>

        {/* Risk Matrix - 1/3 width */}
        <div className="bg-white rounded-lg shadow-sm">
          <RiskCorrelationMatrix />
        </div>
      </div>

      {/* Selected Suburb Analysis Section */}
      {selectedSuburb && analysis && (
        <div className="space-y-6">
          {/* Main Analysis Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Market Analysis */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-bold">{selectedSuburb} Analysis</h2>
                </div>
                <MLAnalytics analysis={analysis} />
              </div>
            </div>

            {/* Middle Column - Market Cycle */}
            <div className="space-y-6">
              <MarketCyclePosition suburb={selectedSuburb} analysis={analysis} />
            </div>

            {/* Right Column - ML Decision */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-bold">ML Decision Factors</h2>
                </div>
                <MLDecisionViz analysis={analysis} />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Suburb Comparison */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <ArrowLeftRight className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-bold">Comparable Suburbs</h2>
              </div>
              <SuburbComparison suburbs={[selectedSuburb]} />
            </div>

            {/* Underwriting Impact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-bold">Underwriting Impact</h2>
              </div>
              <UnderwritingIntegration />
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* No Suburb Selected State */}
      {!selectedSuburb && !isLoading && (
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Select a Suburb to View Analysis
          </h3>
          <p className="text-blue-700">
            Click on any suburb on the map to view detailed ML analysis and market insights
          </p>
        </div>
      )}
    </div>
  );
};

export default TrafficLightZones;