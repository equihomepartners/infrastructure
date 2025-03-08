import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface MLAnalysisProps {
  analysis: {
    confidence: number;
    metrics: {
      growth: number;
      risk: number;
      infrastructure: number;
      development: string;
      transport: number;
      schools: number;
      marketMetrics: {
        medianPrice: number;
        priceGrowth: number;
        rentalYield: number;
      };
    };
    predictions: {
      shortTerm: {
        prediction: string;
        confidence: number;
        factors: string[];
      };
      mediumTerm: {
        prediction: string;
        confidence: number;
        factors: string[];
      };
      longTerm: {
        prediction: string;
        confidence: number;
        factors: string[];
      };
    };
  };
}

const MLAnalytics: React.FC<MLAnalysisProps> = ({ analysis }) => {
  return (
    <div className="space-y-8">
      {/* Predictions Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Short Term */}
        <div className="bg-white rounded-lg border p-4 space-y-3">
          <h4 className="font-semibold text-lg">Short Term</h4>
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">Confidence</p>
              <p className="font-semibold">
                {formatNumber.percentage(analysis.predictions.shortTerm.confidence)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Prediction</p>
              <p className="font-semibold text-green-600">{analysis.predictions.shortTerm.prediction}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Key Factors</p>
              <ul className="text-sm">
                {analysis.predictions.shortTerm.factors.map((factor, idx) => (
                  <li key={idx} className="text-gray-700">• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Medium Term */}
        <div className="bg-white rounded-lg border p-4 space-y-3">
          <h4 className="font-semibold text-lg">Medium Term</h4>
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">Confidence</p>
              <p className="font-semibold">
                {formatNumber.percentage(analysis.predictions.mediumTerm.confidence)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Prediction</p>
              <p className="font-semibold text-blue-600">{analysis.predictions.mediumTerm.prediction}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Key Factors</p>
              <ul className="text-sm">
                {analysis.predictions.mediumTerm.factors.map((factor, idx) => (
                  <li key={idx} className="text-gray-700">• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Long Term */}
        <div className="bg-white rounded-lg border p-4 space-y-3">
          <h4 className="font-semibold text-lg">Long Term</h4>
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">Confidence</p>
              <p className="font-semibold">
                {formatNumber.percentage(analysis.predictions.longTerm.confidence)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Prediction</p>
              <p className="font-semibold text-purple-600">{analysis.predictions.longTerm.prediction}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Key Factors</p>
              <ul className="text-sm">
                {analysis.predictions.longTerm.factors.map((factor, idx) => (
                  <li key={idx} className="text-gray-700">• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Market Metrics */}
      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold text-lg mb-4">Market Metrics</h4>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Median Price</p>
            <p className="text-lg font-semibold">
              {formatNumber.currency(analysis.metrics.marketMetrics.medianPrice)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Price Growth</p>
            <p className="text-lg font-semibold text-green-600">
              {formatNumber.percentage(analysis.metrics.marketMetrics.priceGrowth)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Rental Yield</p>
            <p className="text-lg font-semibold">
              {analysis.metrics.marketMetrics.rentalYield.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Infrastructure Metrics */}
      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold text-lg mb-4">Infrastructure & Development</h4>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Infrastructure Score</p>
            <p className="text-lg font-semibold">
              {formatNumber.percentage(analysis.metrics.infrastructure)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Transport Score</p>
            <p className="text-lg font-semibold">
              {formatNumber.percentage(analysis.metrics.transport)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Schools Score</p>
            <p className="text-lg font-semibold">
              {formatNumber.percentage(analysis.metrics.schools)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Development Status</p>
            <p className="text-lg font-semibold">{analysis.metrics.development}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLAnalytics; 