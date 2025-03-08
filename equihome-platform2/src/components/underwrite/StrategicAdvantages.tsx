import React from 'react';
import { Lightbulb } from 'lucide-react';

const StrategicAdvantages: React.FC = () => (
  <section className="bg-white rounded-lg shadow-sm p-8">
    <div className="flex items-center mb-6">
      <Lightbulb className="h-7 w-7 text-indigo-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Strategic Advantages</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <img 
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        alt="Strategic Advantages"
        className="w-full rounded-lg shadow-md"
      />
      <div className="space-y-6">
        <div className="bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">CIO Dashboard</h3>
          <p className="text-indigo-800">
            Offers a holistic view of fund performance, tracking individual loan statuses and enabling real-time 
            strategic decisions. This tool allows the CIO to manage the portfolio dynamically, responding to 
            shifting market conditions and optimising investment strategies.
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Enhanced Predictive Capabilities</h3>
          <p className="text-green-800">
            The system continuously improves its algorithms through machine learning, enabling more accurate risk 
            and return forecasts, and refining its ability to manage the portfolio effectively.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Customer Engagement</h3>
          <p className="text-blue-800">
            Simplifies the loan application process by providing customers with transparency and control over their 
            financing options, making the experience more user-friendly and efficient.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default StrategicAdvantages;