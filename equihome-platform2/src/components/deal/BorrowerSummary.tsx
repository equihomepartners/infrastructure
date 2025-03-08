import React from 'react';
import { Users } from 'lucide-react';
import type { Deal } from '../../types';

interface Props {
  deal: Deal;
}

const BorrowerSummary: React.FC<Props> = ({ deal }) => (
  <div className="bg-white rounded-lg shadow-sm p-8">
    <div className="flex items-center mb-6">
      <Users className="h-6 w-6 text-indigo-600 mr-2" />
      <h2 className="text-xl font-semibold">Borrower Summary</h2>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">Name</div>
        <div className="font-medium">{deal.borrowerProfile.name}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">Family Status</div>
        <div className="font-medium">{deal.borrowerProfile.familyStatus}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">Annual Income</div>
        <div className="font-medium">${deal.borrowerProfile.income.toLocaleString()}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">Use of Funds</div>
        <div className="font-medium">{deal.borrowerProfile.useOfFunds}</div>
      </div>
    </div>
  </div>
)

export default BorrowerSummary;