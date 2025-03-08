import React from 'react';
import { FileCheck } from 'lucide-react';

const DealApprovalProcess: React.FC = () => (
  <section className="bg-white rounded-lg shadow-sm p-8">
    <div className="flex items-center mb-6">
      <FileCheck className="h-7 w-7 text-indigo-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Deal Approval Process</h2>
    </div>
    <div className="mb-8">
      <img 
        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
        alt="Deal Approval Flowchart"
        className="w-full rounded-lg shadow-md"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Initial Processing</h3>
        <ul className="space-y-2 text-blue-800">
          <li>• Automated data collection</li>
          <li>• Identity verification</li>
          <li>• Fraud detection systems</li>
          <li>• Initial risk assessment</li>
        </ul>
      </div>
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">AI Analysis</h3>
        <ul className="space-y-2 text-green-800">
          <li>• Property valuation (AVM)</li>
          <li>• Credit scoring</li>
          <li>• Risk analysis</li>
          <li>• Return projections</li>
        </ul>
      </div>
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">Decision Making</h3>
        <ul className="space-y-2 text-purple-800">
          <li>• Automated approval logic</li>
          <li>• Human review triggers</li>
          <li>• Final underwriting</li>
          <li>• Deal finalization</li>
        </ul>
      </div>
    </div>
  </section>
);

export default DealApprovalProcess;