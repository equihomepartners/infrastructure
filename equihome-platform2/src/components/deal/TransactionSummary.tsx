import React from 'react';
import { DollarSign, ArrowUpRight, Clock, Percent } from 'lucide-react';
import type { Deal } from '../../types';

interface Props {
  deal: Deal;
}

const TransactionSummary: React.FC<Props> = ({ deal }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <DollarSign className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Transaction Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Capital Repayment</div>
                <div className="text-xl font-semibold">
                  ${deal.capitalRepayment?.toLocaleString() ?? 'N/A'}
                </div>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Equihome Interest Earned</div>
                <div className="text-xl font-semibold text-green-600">
                  ${deal.interestEarned?.toLocaleString() ?? 'N/A'}
                </div>
              </div>
              <Percent className="h-5 w-5 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Equihome Fee Earned</div>
                <div className="text-xl font-semibold text-green-600">
                  ${deal.equihomeFeeEarned?.toLocaleString() ?? 'N/A'}
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Interest Rate</div>
            <div className="text-xl font-semibold">{deal.loanTerms?.interestRate ?? 'N/A'}%</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Upside Share</div>
            <div className="text-xl font-semibold">{deal.loanTerms?.upsideParticipation?.toFixed(2) ?? 'N/A'}%</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Term</div>
            <div className="text-xl font-semibold">{deal.loanTerms?.term ?? 'N/A'} years</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;