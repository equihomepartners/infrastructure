import React, { useState } from 'react';
import { Brain, Calculator, LineChart, FileCheck } from 'lucide-react';
import UnderwriteForm from './underwrite/UnderwriteForm';
import UnderwriteResults from './underwrite/UnderwriteResults';
import type { FormData, LoanDecision } from '../../types';
import { analyzeLoanApplication } from '../../services/openai';

const UnderwriteDemo: React.FC = () => {
  const [decision, setDecision] = useState<LoanDecision | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI Underwriting System Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience our sophisticated AI-driven underwriting process. Input property and borrower details 
          to see how our system analyzes and structures deals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <Brain className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">AI Analysis</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Our AI system processes multiple data points to assess risk and calculate optimal loan terms
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center text-green-600 mb-4">
            <Calculator className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Return Modeling</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Sophisticated financial modeling to project returns and optimize deal structure
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center text-purple-600 mb-4">
            <LineChart className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Risk Assessment</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Comprehensive risk analysis considering multiple factors and market conditions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <UnderwriteForm onSubmit={handleSubmit} loading={loading} />
        </div>

        <div className="space-y-6">
          {decision && <UnderwriteResults decision={decision} />}
        </div>
      </div>
    </div>
  );
};

export default UnderwriteDemo;