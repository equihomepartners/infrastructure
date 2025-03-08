import React from 'react';
import { Line, Radar, Doughnut } from 'react-chartjs-2';
import { AdvancedMLMetrics } from '../../types/zoning';

interface Props {
  metrics: AdvancedMLMetrics;
  suburb: string;
}

const AdvancedMLVisuals: React.FC<Props> = ({ metrics, suburb }) => {
  const riskData = {
    labels: ['Market', 'Development', 'Environmental', 'Regulatory'],
    datasets: [{
      label: 'Risk Profile',
      data: [
        metrics.riskAssessment.marketRisk,
        metrics.riskAssessment.developmentRisk,
        metrics.riskAssessment.environmentalRisk,
        metrics.riskAssessment.regulatoryRisk
      ],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const demographicData = {
    labels: ['Young Professionals', 'Families', 'Retirees'],
    datasets: [{
      data: [
        metrics.socialFactors.demographicTrends.youngProfessionals,
        metrics.socialFactors.demographicTrends.families,
        metrics.socialFactors.demographicTrends.retirees
      ],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      {/* Market Cycle Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">
            {metrics.propertyMarket.marketCycle.phase}
          </div>
          <div className="text-sm text-gray-600">Current Phase</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {metrics.propertyMarket.marketCycle.duration} months
          </div>
          <div className="text-sm text-gray-600">Phase Duration</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-purple-600">
            {metrics.propertyMarket.marketCycle.nextPhase}
          </div>
          <div className="text-sm text-gray-600">Predicted Next Phase</div>
        </div>
      </div>

      {/* ML Confidence Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {metrics.mlConfidence.dataQuality}%
          </div>
          <div className="text-sm text-gray-600">Data Quality</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {metrics.mlConfidence.predictionAccuracy}%
          </div>
          <div className="text-sm text-gray-600">Prediction Accuracy</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {metrics.mlConfidence.modelReliability}%
          </div>
          <div className="text-sm text-gray-600">Model Reliability</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-bold text-indigo-600">
            {metrics.mlConfidence.updateFrequency}
          </div>
          <div className="text-sm text-gray-600">Update Frequency</div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMLVisuals; 