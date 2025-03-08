import React, { useMemo } from 'react';
import { Card } from '../../ui/card';
import { Line } from 'react-chartjs-2';

// Basic fund parameters
const FUND_SIZE = 100000000; // $100M fund
const LOAN_SIZE = 500000;    // $500k per loan
const PROPERTY_VALUE = 1000000; // $1M per property
const LTV = 0.5;             // 50% LTV
const INTEREST_RATE = 0.05;  // 5% annual interest
const APPRECIATION_RATE = 0.10; // 10% annual appreciation
const LOAN_TERM = 10;        // 10 year term

interface Deal {
  id: number;
  entryYear: number;
  exitYear: number;
}

const PortfolioModel: React.FC = () => {
  // Calculate total number of deals
  const totalDeals = Math.floor(FUND_SIZE / LOAN_SIZE);
  
  // Generate deals (spread evenly over first 3 years)
  const deals = useMemo(() => {
    return Array.from({ length: totalDeals }, (_, i) => ({
      id: i + 1,
      entryYear: Math.min(1 + Math.floor(i / (totalDeals / 3)), 3),
      exitYear: Math.min(1 + Math.floor(i / (totalDeals / 3)), 3) + LOAN_TERM
    }));
  }, [totalDeals]);

  // Calculate yearly metrics
  const yearlyMetrics = useMemo(() => {
    return Array.from({ length: 13 }, (_, year) => {
      const yearNum = year + 1;
      
      // Find deals active/exiting this year
      const activeDeals = deals.filter(d => d.entryYear <= yearNum && d.exitYear >= yearNum);
      const exitingDeals = deals.filter(d => d.exitYear === yearNum);
      
      // Calculate returns for exiting deals
      const exitReturns = exitingDeals.map(deal => {
        const term = LOAN_TERM;
        
        // Principal return
        const principal = LOAN_SIZE;
        
        // Interest return (compounded annually)
        const totalWithInterest = LOAN_SIZE * Math.pow(1 + INTEREST_RATE, term);
        const interestReturn = totalWithInterest - LOAN_SIZE;
        
        // Appreciation return
        const finalPropertyValue = PROPERTY_VALUE * Math.pow(1 + APPRECIATION_RATE, term);
        const totalAppreciation = finalPropertyValue - PROPERTY_VALUE;
        const appreciationReturn = totalAppreciation * LTV; // Share based on LTV
        
        return {
          principal,
          interestReturn,
          appreciationReturn,
          totalReturn: principal + interestReturn + appreciationReturn
        };
      });
      
      // Sum up the returns
      const totalPrincipal = exitReturns.reduce((sum, r) => sum + r.principal, 0);
      const totalInterest = exitReturns.reduce((sum, r) => sum + r.interestReturn, 0);
      const totalAppreciation = exitReturns.reduce((sum, r) => sum + r.appreciationReturn, 0);
      
      // Calculate deployed capital
      const deployedCapital = activeDeals.length * LOAN_SIZE;

      return {
        year: yearNum,
        activeDeals: activeDeals.length,
        exitingDeals: exitingDeals.length,
        deployedCapital,
        principalReturned: totalPrincipal,
        interestReturns: totalInterest,
        appreciationReturns: totalAppreciation,
        totalReturns: totalPrincipal + totalInterest + totalAppreciation
      };
    });
  }, [deals]);

  // Calculate single deal returns at maturity
  const singleDealReturns = {
    principal: LOAN_SIZE,
    interest: LOAN_SIZE * (Math.pow(1 + INTEREST_RATE, LOAN_TERM) - 1),
    appreciation: PROPERTY_VALUE * (Math.pow(1 + APPRECIATION_RATE, LOAN_TERM) - 1) * LTV
  };

  return (
    <div className="space-y-8">
      {/* Fund Parameters */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Fund Parameters</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Fund Size</p>
            <p className="text-lg">${(FUND_SIZE / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Deals</p>
            <p className="text-lg">{totalDeals}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Loan Size</p>
            <p className="text-lg">${(LOAN_SIZE / 1000).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-sm font-medium">Property Value</p>
            <p className="text-lg">${(PROPERTY_VALUE / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm font-medium">Interest Rate</p>
            <p className="text-lg">{(INTEREST_RATE * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm font-medium">Appreciation Rate</p>
            <p className="text-lg">{(APPRECIATION_RATE * 100).toFixed(1)}%</p>
          </div>
        </div>
      </Card>

      {/* Single Deal Returns */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Single Deal Returns at Year {LOAN_TERM}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Principal</p>
            <p className="text-lg">${(singleDealReturns.principal / 1000).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-sm font-medium">Interest</p>
            <p className="text-lg">${(singleDealReturns.interest / 1000).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-sm font-medium">Appreciation</p>
            <p className="text-lg">${(singleDealReturns.appreciation / 1000).toFixed(0)}k</p>
          </div>
          <div className="col-span-3">
            <p className="text-sm font-medium">Total Return</p>
            <p className="text-lg">${((singleDealReturns.principal + singleDealReturns.interest + singleDealReturns.appreciation) / 1000).toFixed(0)}k</p>
          </div>
        </div>
      </Card>

      {/* Yearly Metrics Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Yearly Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-right">Active Deals</th>
                <th className="px-4 py-2 text-right">Exiting Deals</th>
                <th className="px-4 py-2 text-right">Deployed ($M)</th>
                <th className="px-4 py-2 text-right">Principal ($M)</th>
                <th className="px-4 py-2 text-right">Interest ($M)</th>
                <th className="px-4 py-2 text-right">Appreciation ($M)</th>
                <th className="px-4 py-2 text-right">Total Returns ($M)</th>
              </tr>
            </thead>
            <tbody>
              {yearlyMetrics.map((m, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2">{m.year}</td>
                  <td className="px-4 py-2 text-right">{m.activeDeals}</td>
                  <td className="px-4 py-2 text-right">{m.exitingDeals}</td>
                  <td className="px-4 py-2 text-right">{(m.deployedCapital / 1000000).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{(m.principalReturned / 1000000).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{(m.interestReturns / 1000000).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{(m.appreciationReturns / 1000000).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{(m.totalReturns / 1000000).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioModel;