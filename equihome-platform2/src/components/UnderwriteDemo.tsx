import React, { useState } from 'react';
import { Brain, Calculator, LineChart, AlertTriangle } from 'lucide-react';
import UnderwriteForm from './underwrite/UnderwriteForm';
import UnderwriteResults from './underwrite/UnderwriteResults';
import type { FormData, LoanDecision } from '../types';
import { analyzeLoanApplication } from '../services/mockAnalysis';

const presetScenarios = [
  {
    title: "Downsizer in Double Bay",
    description: "Empty nesters looking to unlock equity in their family home while maintaining their lifestyle in Sydney's Eastern Suburbs.",
    data: {
      borrowerName: "Richard & Margaret Wilson",
      annualIncome: 380000,
      employmentStatus: "self-employed",
      propertyAddress: "28 William Street, Double Bay",
      propertyType: "house",
      currentValue: 4200000,
      mortgageBalance: 850000,
      loanAmount: 600000,
      loanPurpose: "investment",
      loanTerm: 10,
      forecastedGrowth: 8.2
    }
  },
  {
    title: "Young Family in Manly",
    description: "Professional couple seeking to renovate their beachside property to accommodate their growing family.",
    data: {
      borrowerName: "Alex & Sophie Taylor",
      annualIncome: 420000,
      employmentStatus: "employed",
      propertyAddress: "15 Bower Street, Manly",
      propertyType: "house",
      currentValue: 2850000,
      mortgageBalance: 1200000,
      loanAmount: 450000,
      loanPurpose: "renovation",
      loanTerm: 7,
      forecastedGrowth: 7.8
    }
  },
  {
    title: "Professional in Kirribilli",
    description: "Senior executive looking to reduce mortgage payments on their harbourside apartment to focus on investment opportunities.",
    data: {
      borrowerName: "Victoria Chang",
      annualIncome: 290000,
      employmentStatus: "employed",
      propertyAddress: "42 Upper Pitt Street, Kirribilli",
      propertyType: "apartment",
      currentValue: 1950000,
      mortgageBalance: 750000,
      loanAmount: 350000,
      loanPurpose: "refinance",
      loanTerm: 5,
      forecastedGrowth: 6.8
    }
  }
];

const UnderwriteDemo: React.FC = () => {
  const [decision, setDecision] = useState<LoanDecision | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<FormData | null>(null);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await analyzeLoanApplication(data);
      setDecision(result);
    } catch (error) {
      console.error('Error analyzing loan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScenarioSelect = (scenarioData: FormData) => {
    setSelectedScenario(scenarioData);
    handleSubmit(scenarioData);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            AI Underwriting Demo
          </h1>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-mono">
            alpha
          </span>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience our AI-driven underwriting process in action
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-yellow-800">Demo Environment Notice</h3>
            <p className="mt-2 text-yellow-700">
              This demo uses simulated data to showcase initial capabilities. The production version will include:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-yellow-600">
              <li>• Property-specific data from PropTrack and CoreLogic</li>
              <li>• Real-time AVM reports and market analysis</li>
              <li>• Comprehensive suburb-level economic indicators</li>
              <li>• Machine learning models trained on actual market data</li>
              <li>• Integration with property condition reports and comparable sales</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center text-blue-600 mb-4">
            <Brain className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">AI Analysis</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Our AI system processes multiple data points to assess risk and calculate optimal loan terms
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center text-blue-600 mb-4">
            <Calculator className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Return Modeling</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Sophisticated financial modeling to project returns and optimize deal structure
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center text-blue-600 mb-4">
            <LineChart className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Risk Assessment</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Comprehensive risk analysis considering multiple factors and market conditions
          </p>
        </div>
      </div>

      {/* Example Scenarios */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Example Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {presetScenarios.map((scenario, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h4>
              <p className="text-gray-600 mb-4">{scenario.description}</p>
              <button
                onClick={() => handleScenarioSelect(scenario.data)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Analyze This Scenario
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <UnderwriteForm 
            onSubmit={handleSubmit} 
            loading={loading} 
            initialValues={selectedScenario}
          />
        </div>

        <div className="space-y-6">
          {decision && <UnderwriteResults decision={decision} />}
        </div>
      </div>
    </div>
  );
};

export default UnderwriteDemo;