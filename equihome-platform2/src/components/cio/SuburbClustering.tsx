import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Brain, ArrowRight, TrendingUp, AlertTriangle, Building, LineChart } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface ClusterData {
  suburb: string;
  x: number; // Growth potential
  y: number; // Risk level
  zone: 'green' | 'orange' | 'red';
  transitionProbability?: number;
  transitionTimeframe?: number; // months
  keyDrivers: string[];
  investmentImplications: string[];
  underwritingConsiderations: {
    ltv: number;
    pricing: string;
    riskAdjustment: string;
  };
  mlConfidence: number;
  historicalPrecedent?: string;
}

const clusterData: ClusterData[] = [
  // High Probability Transitions (80%+ probability)
  {
    suburb: 'Marrickville',
    x: 75,
    y: 45,
    zone: 'orange',
    transitionProbability: 0.85,
    transitionTimeframe: 12,
    keyDrivers: [
      'Infrastructure development (Metro)',
      'Gentrification acceleration',
      'Strong rental demand',
      'Commercial revitalization'
    ],
    investmentImplications: [
      'Early mover advantage potential',
      'Value-add opportunities in older properties',
      'Strong rental yield during transition',
      'Development upside potential'
    ],
    underwritingConsiderations: {
      ltv: 75,
      pricing: 'Premium to current market justified',
      riskAdjustment: 'Reduced risk buffer required'
    },
    mlConfidence: 92,
    historicalPrecedent: 'Similar transition pattern to Surry Hills (2015-2020)'
  },
  {
    suburb: 'Alexandria',
    x: 78,
    y: 42,
    zone: 'orange',
    transitionProbability: 0.82,
    transitionTimeframe: 12,
    keyDrivers: [
      'WestConnex completion',
      'Tech hub development',
      'Lifestyle precinct expansion',
      'Transport improvements'
    ],
    investmentImplications: [
      'Focus on commercial-residential mixed areas',
      'Target warehouse conversions',
      'Consider creative space developments',
      'Monitor tech company movements'
    ],
    underwritingConsiderations: {
      ltv: 75,
      pricing: 'Growth premium justified',
      riskAdjustment: 'Standard buffer adequate'
    },
    mlConfidence: 90,
    historicalPrecedent: 'Following Waterloo transformation pattern'
  },
  {
    suburb: 'Erskineville',
    x: 76,
    y: 43,
    zone: 'orange',
    transitionProbability: 0.81,
    transitionTimeframe: 15,
    keyDrivers: [
      'Metro station development',
      'Young professional influx',
      'Cafe culture expansion',
      'School catchment demand'
    ],
    investmentImplications: [
      'Target family-friendly properties',
      'Focus on station proximity',
      'Consider retail strip opportunities',
      'Monitor education developments'
    ],
    underwritingConsiderations: {
      ltv: 72,
      pricing: 'Location premium emerging',
      riskAdjustment: 'Conservative approach advised'
    },
    mlConfidence: 89,
    historicalPrecedent: 'Similar to Newtown evolution'
  },

  // Medium-High Probability Transitions (70-80% probability)
  {
    suburb: 'Ashfield',
    x: 72,
    y: 48,
    zone: 'orange',
    transitionProbability: 0.78,
    transitionTimeframe: 18,
    keyDrivers: [
      'Transport connectivity improvements',
      'Spillover from inner west',
      'Increasing young professional demographic',
      'Retail precinct upgrades'
    ],
    investmentImplications: [
      'Medium-term growth play',
      'Focus on transport-proximate properties',
      'Commercial property opportunities',
      'Student housing potential'
    ],
    underwritingConsiderations: {
      ltv: 70,
      pricing: 'Current market rates with upside',
      riskAdjustment: 'Standard risk assessment'
    },
    mlConfidence: 87,
    historicalPrecedent: 'Following Marrickville trajectory with 3-year lag'
  },
  {
    suburb: 'Mascot',
    x: 71,
    y: 49,
    zone: 'orange',
    transitionProbability: 0.75,
    transitionTimeframe: 18,
    keyDrivers: [
      'Airport link benefits',
      'Business park expansion',
      'New retail developments',
      'Transport hub status'
    ],
    investmentImplications: [
      'Corporate rental focus',
      'Airport proximity premium',
      'Mixed-use development potential',
      'Transport corridor opportunities'
    ],
    underwritingConsiderations: {
      ltv: 70,
      pricing: 'Transport premium emerging',
      riskAdjustment: 'Monitor airport developments'
    },
    mlConfidence: 86,
    historicalPrecedent: 'Green Square transformation pattern'
  },

  // Medium Probability Transitions (60-70% probability)
  {
    suburb: 'Dulwich Hill',
    x: 68,
    y: 52,
    zone: 'orange',
    transitionProbability: 0.68,
    transitionTimeframe: 24,
    keyDrivers: [
      'Light rail benefits',
      'Inner west spillover',
      'Village atmosphere',
      'School zone demand'
    ],
    investmentImplications: [
      'Long-term hold strategy',
      'Light rail proximity focus',
      'Family demographic targeting',
      'Village retail opportunities'
    ],
    underwritingConsiderations: {
      ltv: 65,
      pricing: 'Value opportunities remain',
      riskAdjustment: 'Higher buffer recommended'
    },
    mlConfidence: 84,
    historicalPrecedent: 'Summer Hill transformation model'
  },
  {
    suburb: 'Rosebery',
    x: 67,
    y: 53,
    zone: 'orange',
    transitionProbability: 0.65,
    transitionTimeframe: 24,
    keyDrivers: [
      'Industrial conversion trend',
      'Green Square proximity',
      'Lifestyle development',
      'Employment corridor growth'
    ],
    investmentImplications: [
      'Industrial conversion opportunities',
      'New development monitoring',
      'Employment corridor focus',
      'Lifestyle precinct potential'
    ],
    underwritingConsiderations: {
      ltv: 65,
      pricing: 'Industrial zone premium',
      riskAdjustment: 'Development risk focus'
    },
    mlConfidence: 83,
    historicalPrecedent: 'Alexandria industrial conversion pattern'
  },

  // Emerging Transition Potential (50-60% probability)
  {
    suburb: 'Canterbury',
    x: 58,
    y: 62,
    zone: 'red',
    transitionProbability: 0.55,
    transitionTimeframe: 36,
    keyDrivers: [
      'River precinct development',
      'Transport corridor position',
      'Education sector growth',
      'Cultural diversity appeal'
    ],
    investmentImplications: [
      'Early stage positioning',
      'Riverfront opportunities',
      'Student accommodation potential',
      'Cultural precinct focus'
    ],
    underwritingConsiderations: {
      ltv: 60,
      pricing: 'Current market value focus',
      riskAdjustment: 'Higher risk buffer required'
    },
    mlConfidence: 81,
    historicalPrecedent: 'Early Marrickville indicators'
  }
];

const SuburbClustering: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Zone Transition Analysis</h3>
        </div>
        <div className="flex items-center space-x-2">
          <LineChart className="h-4 w-4 text-blue-600" />
          <span className="text-sm">ML-powered predictions</span>
        </div>
      </div>

      {/* Transition Predictions */}
      <div className="grid grid-cols-2 gap-8">
        {clusterData.map(suburb => (
          <div key={suburb.suburb} className="bg-gray-50 p-4 rounded-lg border">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-semibold text-lg">{suburb.suburb}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suburb.zone === 'orange' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {suburb.zone.toUpperCase()} → GREEN
                  </span>
                  <span className="text-sm text-blue-600">
                    {suburb.transitionTimeframe} month timeline
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber.percentage(suburb.transitionProbability! * 100)}
                </div>
                <div className="text-sm text-gray-600">transition probability</div>
              </div>
            </div>

            {/* ML Confidence */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">ML Confidence</span>
                <span className="text-sm font-medium">{formatNumber.percentage(suburb.mlConfidence)}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${suburb.mlConfidence}%` }}
                />
              </div>
            </div>

            {/* Key Drivers */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-800 mb-2">Key Transition Drivers</h5>
              <div className="space-y-1">
                {suburb.keyDrivers.map((driver, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Implications */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-800 mb-2">Investment Strategy</h5>
              <div className="space-y-1">
                {suburb.investmentImplications.map((implication, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-blue-500" />
                    <span>{implication}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Underwriting Guidance */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">Underwriting Considerations</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Max LTV</span>
                  <span className="font-medium">{suburb.underwritingConsiderations.ltv}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Pricing Strategy</span>
                  <span className="font-medium">{suburb.underwritingConsiderations.pricing}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Risk Adjustment</span>
                  <span className="font-medium">{suburb.underwritingConsiderations.riskAdjustment}</span>
                </div>
              </div>
            </div>

            {/* Historical Precedent */}
            {suburb.historicalPrecedent && (
              <div className="mt-4 text-sm text-gray-600">
                <span className="font-medium">Historical Precedent:</span> {suburb.historicalPrecedent}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuburbClustering; 