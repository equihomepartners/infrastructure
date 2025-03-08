import React from 'react';
import { User, DollarSign, Users, Target } from 'lucide-react';
import type { BorrowerProfile as BorrowerProfileType } from '../../types';

interface Props {
  profile: BorrowerProfileType;
}

const BorrowerProfile: React.FC<Props> = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Borrower Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <User className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-sm text-gray-600">Name</span>
          </div>
          <div className="text-lg font-medium">{profile.name}</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-sm text-gray-600">Family Status</span>
          </div>
          <div className="text-lg font-medium">{profile.familyStatus}</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-sm text-gray-600">Annual Income</span>
          </div>
          <div className="text-lg font-medium">${profile.income.toLocaleString()}</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Target className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-sm text-gray-600">Use of Funds</span>
          </div>
          <div className="text-lg font-medium">{profile.useOfFunds}</div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerProfile;