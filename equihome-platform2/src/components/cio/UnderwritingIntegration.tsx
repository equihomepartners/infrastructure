import React, { useState, useEffect } from 'react';
import { getUnderwritingIntegration } from '../../services/mlAnalytics';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Clock, Brain, RefreshCw } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

const UnderwritingIntegration: React.FC = () => {
  const [underwritingStatus, setUnderwritingStatus] = useState(getUnderwritingIntegration());

  useEffect(() => {
    const interval = setInterval(() => {
      setUnderwritingStatus(getUnderwritingIntegration());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">Underwriting System Integration</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Processing Time: {formatNumber.time(underwritingStatus.averageProcessingTime)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-4">Zone Performance Analysis</h4>
          <div className="space-y-4">
            {Object.entries(underwritingStatus.zoneImpact).map(([zone, metrics]: [string, any]) => (
              <div key={zone} className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium capitalize">{zone} Zone</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    zone === 'green' ? 'bg-green-100 text-green-800' :
                    zone === 'orange' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formatNumber.percentage(metrics.approvalRate)} Approval
                  </span>
                </div>
                <div className="text-sm">
                  <div className="text-gray-600 mb-1">Processing Time</div>
                  <div className="font-medium">{formatNumber.time(metrics.avgProcessingTime)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Recent Assessments</h4>
          <div className="space-y-4">
            {underwritingStatus.recentDeals.map((deal, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{deal.suburb}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    deal.status === 'approved' ? 'bg-green-100 text-green-800' :
                    deal.status === 'flagged' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {deal.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Value</div>
                    <div className="text-sm font-medium">
                      {formatNumber.currency(deal.propertyValue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">LTV</div>
                    <div className="text-sm font-medium">
                      {formatNumber.percentage(deal.ltv)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Time</div>
                    <div className="text-sm font-medium">
                      {formatNumber.time(deal.processingTime)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-3">Portfolio Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Loan Size</span>
              <span className="font-medium">{formatNumber.currency(underwritingStatus.keyMetrics.avgLoanSize)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg LTV</span>
              <span className="font-medium">{formatNumber.percentage(underwritingStatus.keyMetrics.avgLtv)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Property Value</span>
              <span className="font-medium">{formatNumber.currency(underwritingStatus.keyMetrics.avgPropertyValue)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-3">Risk Factors</h4>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-2">Highest Impact</div>
              <div className="space-y-2">
                {underwritingStatus.riskFactors.highestImpact.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Moderate Impact</div>
              <div className="space-y-2">
                {underwritingStatus.riskFactors.moderateImpact.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-3">Zone Distribution</h4>
          <div className="space-y-4">
            {Object.entries(underwritingStatus.keyMetrics.zoneDistribution).map(([zone, percentage]) => (
              <div key={zone}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 capitalize">{zone}</span>
                  <span className="font-medium">{formatNumber.percentage(percentage)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      zone === 'green' ? 'bg-green-500' :
                      zone === 'orange' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingIntegration; 