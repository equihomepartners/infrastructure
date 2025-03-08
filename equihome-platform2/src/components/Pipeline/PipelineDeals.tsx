import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  ArrowUpDown,
  Calendar,
  Home,
  DollarSign,
  Percent,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { pipelineDeals } from '../../data/pipelineData';
import { useFundParameters } from '../../store/fundParameters';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';

const PipelineDeals: React.FC = () => {
  const [expandedDeal, setExpandedDeal] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('applicationDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { maxLTV, targetIRR } = useFundParameters();

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field: string) => (
    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === field ? 'opacity-100' : 'opacity-50'}`} />
  );

  const sortedDeals = useMemo(() => {
    return [...pipelineDeals].sort((a, b) => {
      let compareValueA: number | string | Date = 0;
      let compareValueB: number | string | Date = 0;

      switch (sortField) {
        case 'applicationDate':
          compareValueA = new Date(a.applicationDate);
          compareValueB = new Date(b.applicationDate);
          break;
        case 'propertyValue':
          compareValueA = a.propertyDetails.currentValue;
          compareValueB = b.propertyDetails.currentValue;
          break;
        case 'loanAmount':
          compareValueA = a.loanRequest.amount;
          compareValueB = b.loanRequest.amount;
          break;
        case 'ltv':
          // Calculate combined LTV for both deals
          compareValueA = ((a.loanRequest.amount + a.loanRequest.existingMortgage) / a.propertyDetails.currentValue) * 100;
          compareValueB = ((b.loanRequest.amount + b.loanRequest.existingMortgage) / b.propertyDetails.currentValue) * 100;
          break;
        case 'underwriteScore':
          compareValueA = a.underwriteScore;
          compareValueB = b.underwriteScore;
          break;
        case 'forecastedIrr':
          compareValueA = a.returns.forecastedIrr;
          compareValueB = b.returns.forecastedIrr;
          break;
        default:
          return 0;
      }

      if (compareValueA instanceof Date && compareValueB instanceof Date) {
        return sortDirection === 'asc' 
          ? compareValueA.getTime() - compareValueB.getTime()
          : compareValueB.getTime() - compareValueA.getTime();
      }

      if (typeof compareValueA === 'number' && typeof compareValueB === 'number') {
        return sortDirection === 'asc' 
          ? compareValueA - compareValueB 
          : compareValueB - compareValueA;
      }

      // String comparison
      const stringA = String(compareValueA);
      const stringB = String(compareValueB);
      return sortDirection === 'asc' 
        ? stringA.localeCompare(stringB)
        : stringB.localeCompare(stringA);
    });
  }, [pipelineDeals, sortField, sortDirection]);

  const renderReturnProjections = (deal: typeof pipelineDeals[0]) => {
    const data = {
      labels: deal.returns.yearlyProjections.map(p => `Year ${p.year}`),
      datasets: [
        {
          label: 'Total Return',
          data: deal.returns.yearlyProjections.map(p => p.totalReturn),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) => `$${value.toLocaleString()}`
          }
        }
      }
    };

    return (
      <div className="h-[300px] mt-4">
        <Line data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead onClick={() => handleSort('applicationDate')} className="cursor-pointer">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Application Date
                {renderSortIcon('applicationDate')}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('propertyValue')} className="cursor-pointer">
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Property Value
                {renderSortIcon('propertyValue')}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('loanAmount')} className="cursor-pointer">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Loan Request
                {renderSortIcon('loanAmount')}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('ltv')} className="cursor-pointer">
              <div className="flex items-center">
                <Percent className="h-4 w-4 mr-2" />
                Combined LTV
                {renderSortIcon('ltv')}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('underwriteScore')} className="cursor-pointer">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Underwrite Score
                {renderSortIcon('underwriteScore')}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('forecastedIrr')} className="cursor-pointer">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Forecasted IRR
                {renderSortIcon('forecastedIrr')}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDeals.map((deal) => (
            <React.Fragment key={deal.id}>
              <TableRow>
                <TableCell>
                  <button
                    onClick={() => setExpandedDeal(expandedDeal === deal.id ? null : deal.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedDeal === deal.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{new Date(deal.applicationDate).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">
                    Release: {new Date(deal.expectedFundingDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">${(deal.propertyDetails.currentValue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">{deal.propertyDetails.address}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">${(deal.loanRequest.amount / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">{deal.loanRequest.purpose}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {((deal.loanRequest.amount + deal.loanRequest.existingMortgage) / 
                      deal.propertyDetails.currentValue * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Existing: ${(deal.loanRequest.existingMortgage / 1000000).toFixed(1)}M
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`font-medium ${
                    deal.underwriteScore >= 80 ? 'text-green-600' :
                    deal.underwriteScore >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {deal.underwriteScore}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{deal.returns.forecastedIrr.toFixed(1)}%</div>
                </TableCell>
              </TableRow>
              {expandedDeal === deal.id && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Property Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Adjustment</span>
                              <span>{deal.propertyDetails.riskAdjustment}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Growth Rate</span>
                              <span>{deal.propertyDetails.forecastedGrowthRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Median Price (Similar)</span>
                              <span>${(deal.propertyDetails.medianPriceByType / 1000000).toFixed(1)}M</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Borrower Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name</span>
                              <span>{deal.borrowerDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Income</span>
                              <span>${deal.borrowerDetails.income.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Occupation</span>
                              <span>{deal.borrowerDetails.occupation}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Return Projections</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Forecasted IRR</span>
                              <span>{deal.returns.forecastedIrr}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">5-Year Return</span>
                              <span>${deal.returns.yearlyProjections[4].totalReturn.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {renderReturnProjections(deal)}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PipelineDeals;