import React from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle, DollarSign, Percent, Scale, ArrowRight, Clock } from 'lucide-react';

interface ProductComparisonProps {
  modelInputs: {
    propertyValue: number;
    loanAmount: number;
    loanTerm: number; // 10 years max for Equihome
    interestRate: number;
    upfrontFee: number;
    growthRate: number;
    existingMortgage: number;
    desiredExitYear: number;
  };
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ modelInputs }) => {
  // Traditional Second Mortgage Parameters
  const secondMortgageRate = 8.99; // Current market rate for second mortgages
  const secondMortgagePoints = 2; // Points charged upfront
  const secondMortgageClosingCosts = 3500; // Typical closing costs
  const secondMortgageTerm = 360; // 30 years in months

  // Calculate monthly payments for traditional second mortgage
  const monthlyRate = secondMortgageRate / 100 / 12;
  const monthlyPayment = (modelInputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, secondMortgageTerm)) / 
                        (Math.pow(1 + monthlyRate, secondMortgageTerm) - 1);

  // Calculate metrics for traditional mortgage (30 years)
  const traditionalMetrics = Array.from({ length: 10 }, (_, year) => {
    let balance = modelInputs.loanAmount;
    let totalInterest = 0;
    let totalPrincipal = 0;
    
    for (let m = 0; m < (year + 1) * 12; m++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      totalInterest += interestPayment;
      totalPrincipal += principalPayment;
      balance -= principalPayment;
    }

    return {
      year: year + 1,
      totalInterest,
      totalPrincipal,
      totalCost: totalInterest + totalPrincipal + 
                (secondMortgagePoints / 100 * modelInputs.loanAmount) + 
                secondMortgageClosingCosts
    };
  });

  // Calculate metrics for Equihome (10 years)
  const equihomeMetrics = Array.from({ length: 10 }, (_, year) => {
    const yearNum = year + 1;
    const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, yearNum);
    const appreciation = propertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, yearNum) - 1);
    const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);

    return {
      year: yearNum,
      accruedInterest,
      appreciationShare,
      upfrontFee,
      totalCost: accruedInterest + appreciationShare + upfrontFee,
      propertyValue
    };
  });

  // Interest accumulation comparison data
  const interestComparisonData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Traditional Mortgage Interest',
        data: traditionalMetrics.map(m => m.totalInterest),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Equihome Interest',
        data: equihomeMetrics.map(m => m.accruedInterest),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      annotation: {
        annotations: {
          exitLine: {
            type: 'line',
            xMin: modelInputs.desiredExitYear - 1,
            xMax: modelInputs.desiredExitYear - 1,
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: `Target Exit (Year ${modelInputs.desiredExitYear})`,
              position: 'start'
            }
          }
        }
      }
    }
  };

  // Get metrics at target exit year
  const exitYearEquihome = equihomeMetrics[Math.floor(modelInputs.desiredExitYear) - 1];
  const exitYearTraditional = traditionalMetrics[Math.floor(modelInputs.desiredExitYear) - 1];

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Product Structure Comparison</h3>
            <div className="mt-2 text-yellow-700">
              <p>Key differences in capital structure:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Traditional: 30-year term, ${monthlyPayment.toFixed(2)} monthly payment at {secondMortgageRate}% APR</li>
                <li>Equihome: 10-year max term, no payments, {modelInputs.interestRate}% + appreciation share</li>
                <li>Different interest accumulation patterns</li>
                <li>Significant monthly cash flow impact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interest Accumulation (10 Years)</h3>
        <div className="h-[400px]">
          <Line 
            data={interestComparisonData} 
            options={{
              ...commonOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Total Interest ($)'
                  },
                  ticks: {
                    callback: (value: number) => `$${(value / 1000).toFixed(0)}k`
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traditional Second Mortgage (30-Year)</h3>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Monthly Payment Structure</div>
                <Clock className="h-4 w-4 text-red-600" />
              </div>
              <div className="text-xl font-semibold text-red-700">
                ${monthlyPayment.toFixed(2)} per month
              </div>
              <div className="text-sm text-red-600 mt-1">
                ${(monthlyPayment * 12).toFixed(2)} annual payment obligation
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Cost at Year {modelInputs.desiredExitYear}</div>
                <Scale className="h-4 w-4 text-red-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-red-600">Principal Paid</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(exitYearTraditional.totalPrincipal).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-red-600">Interest Paid</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(exitYearTraditional.totalInterest).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Total 30-Year Cost</div>
                <ArrowRight className="h-4 w-4 text-red-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-red-600">Total Principal</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(traditionalMetrics[traditionalMetrics.length - 1].totalPrincipal).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-red-600">Total Interest</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(traditionalMetrics[traditionalMetrics.length - 1].totalInterest).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equihome Solution (10-Year Max)</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Monthly Payment Structure</div>
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-xl font-semibold text-blue-700">$0 per month</div>
              <div className="text-sm text-blue-600 mt-1">
                No monthly payment obligation
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Cost at Year {modelInputs.desiredExitYear}</div>
                <Scale className="h-4 w-4 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-blue-600">Accrued Interest</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(exitYearEquihome.accruedInterest).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-600">Appreciation Share</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(exitYearEquihome.appreciationShare).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Maximum Term Cost (Year 10)</div>
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-blue-600">Total Interest</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(equihomeMetrics[equihomeMetrics.length - 1].accruedInterest).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-600">Total Appreciation</div>
                  <div className="text-lg font-semibold">
                    ${Math.round(equihomeMetrics[equihomeMetrics.length - 1].appreciationShare).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Product Differences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-4">Traditional Second Mortgage</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600">30-year term with fixed ${monthlyPayment.toFixed(2)} monthly payments</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600">Front-loaded interest payments in early years</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600">Total interest paid: ${Math.round(traditionalMetrics[traditionalMetrics.length - 1].totalInterest).toLocaleString()}</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600">Impacts debt-to-income ratio for future borrowing</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600">Early payoff requires refinancing or lump sum</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-900 mb-4">Equihome Solution</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">10-year maximum term with no monthly payments</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Interest accrues but doesn't require servicing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Maximum interest exposure: ${Math.round(equihomeMetrics[equihomeMetrics.length - 1].accruedInterest).toLocaleString()}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">No impact on debt-to-income ratio</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">Flexible exit timing within 10-year window</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;