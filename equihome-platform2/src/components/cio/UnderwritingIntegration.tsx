import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { getUnderwritingIntegration } from '../../services/mlAnalytics';

interface Props {
  analysis?: any;
  isLoading?: boolean;
}

interface UnderwritingStatus {
  averageProcessingTime: number;
  zoneImpact: {
    score: number;
    recommendation: string;
  };
  recentDeals: Array<{
    id: string;
    suburb: string;
    impact: string;
    date: string;
  }>;
  keyMetrics: {
    approvalRate: number;
    averageTime: number;
    riskScore: number;
  };
}

const UnderwritingIntegration: React.FC<Props> = ({ analysis, isLoading }) => {
  const [underwritingStatus, setUnderwritingStatus] = useState<UnderwritingStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getUnderwritingIntegration(analysis?.suburb || '');
        setUnderwritingStatus(status);
      } catch (error) {
        console.error('Error fetching underwriting status:', error);
        setUnderwritingStatus(null);
      }
    };

    if (analysis?.suburb) {
      fetchStatus();
    }
  }, [analysis]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!analysis || !underwritingStatus) {
    return (
      <div className="text-center p-4">
        <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
        <p className="text-gray-600">Select a suburb to view underwriting impact</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">Underwriting Impact</h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Based on ML analysis and historical data
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Approval Rate</p>
            <p className="text-lg font-semibold">{underwritingStatus.keyMetrics.approvalRate}%</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Processing Time</p>
            <p className="text-lg font-semibold">{underwritingStatus.keyMetrics.averageTime} days</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Risk Score</p>
            <p className="text-lg font-semibold">{underwritingStatus.keyMetrics.riskScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingIntegration; 