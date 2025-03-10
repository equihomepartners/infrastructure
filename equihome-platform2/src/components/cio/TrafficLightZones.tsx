import React, { useState, useEffect } from 'react';
import MLEnhancedMap from './MLEnhancedMap';
import MLAnalytics from './MLAnalytics';
import MLDecisionViz from './MLDecisionViz';
import SuburbComparison from './SuburbComparison';
import MLSystemHeader from './MLSystemHeader';
import UnderwritingIntegration from './UnderwritingIntegration';
import RiskCorrelationMatrix from './RiskCorrelationMatrix';
import MarketCyclePosition from './MarketCyclePosition';
import { getSuburbAnalysis, getMLSystemStatus } from '../../services/mlAnalytics';
import { Brain, TrendingUp, Shield, ArrowLeftRight, Map, AlertTriangle, Settings, Loader2, XCircle } from 'lucide-react';
import MLModelEvolution from './MLModelEvolution';

interface TrafficLightZonesProps {
  onTabChange?: (tab: string) => void;
}

const TrafficLightZones: React.FC<TrafficLightZonesProps> = ({ onTabChange }) => {
  const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mlStatus, setMLStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkMLStatus = async () => {
      try {
        const status = await getMLSystemStatus();
        setMLStatus(status);
        setError(null);
      } catch (error) {
        console.error('Error checking ML status:', error);
        setError('Unable to connect to ML service');
      }
    };

    checkMLStatus();
    // Poll ML status every 30 seconds
    const interval = setInterval(checkMLStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSuburbSelect = async (suburb: string) => {
    setIsLoading(true);
    setSelectedSuburb(suburb);
    setError(null);
    
    try {
      const analysis = await getSuburbAnalysis(suburb);
      setAnalysis(analysis);
    } catch (error) {
      console.error('Error fetching suburb analysis:', error);
      setError('Failed to fetch suburb analysis');
      // Keep the selected suburb but set analysis to null to show empty state
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ML System Status */}
      <MLSystemHeader />

      {/* Error States */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <XCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* ML Status Warning */}
      {!mlStatus?.modelConnected && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="font-medium">ML System Disconnected</p>
              <p className="text-sm mt-1">Analysis features will show placeholder data until the ML system is connected.</p>
            </div>
          </div>
        </div>
      )}

      {/* Map Component - Always visible */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sydney Traffic Light Zones</h2>
          <p className="text-sm text-gray-500 mt-1">Select a suburb to view detailed ML analysis</p>
        </div>
        <MLEnhancedMap 
          onSuburbSelect={handleSuburbSelect}
          predictiveMode={mlStatus?.modelConnected}
        />
      </div>
      
      {/* Analysis Components - Always visible with loading/empty states */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MLAnalytics analysis={analysis} isLoading={isLoading} />
        <MLDecisionViz analysis={analysis} isLoading={isLoading} />
        <SuburbComparison suburb={selectedSuburb} analysis={analysis} isLoading={isLoading} />
        <RiskCorrelationMatrix analysis={analysis} isLoading={isLoading} />
        <UnderwritingIntegration analysis={analysis} isLoading={isLoading} />
        <MLModelEvolution analysis={analysis} isLoading={isLoading} />
      </div>

      {/* Loading Overlay - Only shows when actively loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span>Loading analysis...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficLightZones;