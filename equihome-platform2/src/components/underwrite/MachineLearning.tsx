import React from 'react';
import { Brain } from 'lucide-react';

const MachineLearning: React.FC = () => (
  <section className="bg-white rounded-lg shadow-sm p-8">
    <div className="flex items-center mb-6">
      <Brain className="h-7 w-7 text-indigo-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Machine Learning Integration</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">Continuous Learning</h3>
          <p className="text-indigo-800">
            Our AI system continuously learns from each transaction, improving its decision-making 
            capabilities and risk assessment accuracy over time.
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Portfolio Optimization</h3>
          <p className="text-purple-800">
            Dynamic adjustment of underwriting criteria based on portfolio performance and market conditions, 
            ensuring optimal risk-adjusted returns.
          </p>
        </div>
        <div className="bg-pink-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-pink-900 mb-2">Risk Management</h3>
          <p className="text-pink-800">
            Advanced risk modeling and scenario analysis to identify and mitigate potential issues 
            before they impact the portfolio.
          </p>
        </div>
      </div>
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
          alt="Machine Learning Integration"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  </section>
);

export default MachineLearning;