import React from 'react';
import { BarChart2 } from 'lucide-react';

interface Props {
  thesis: string[];
}

const InvestmentThesis: React.FC<Props> = ({ thesis }) => (
  <div className="bg-white rounded-lg shadow-sm p-8">
    <div className="flex items-center mb-6">
      <BarChart2 className="h-6 w-6 text-indigo-600 mr-2" />
      <h2 className="text-xl font-semibold">Investment Thesis</h2>
    </div>
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      {thesis.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);

export default InvestmentThesis;