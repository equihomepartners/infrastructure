import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, MapPin, Info, Target, DollarSign, Percent, Clock, Database } from 'lucide-react';
import type { LoanDecision } from '../../types';
import { useFundParameters } from '../../store/fundParameters';
import ExitTimeAnalysis from './ExitTimeAnalysis';
import FundImpactAnalysis from './FundImpactAnalysis';
import PropTrackAnalysis from './PropTrackAnalysis';
import PropTrackReport from '../PropTrackReport';

interface Props {
  decision: LoanDecision;
}

const UnderwriteResults: React.FC<Props> = ({ decision }) => {
  const [showPropTrack, setShowPropTrack] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState(1);
  
  const { 
    maxLTV, 
    maxCombinedLTV,
    targetIRR,
    zoneAllocation 
  } = useFundParameters();

  // Calculate PropTrack AVM value from LTV and loan amount
  const proptrackValue = decision.loanAmount / (decision.ltv / 100);
  
  // Apply risk adjustment (standard deviation of -10% for conservative valuation)
  const riskAdjustment = 0.90; // 10% reduction
  const riskAdjustedValue = proptrackValue * riskAdjustment;

  // Recalculate LTV based on risk-adjusted value
  const adjustedLTV = (decision.loanAmount / riskAdjustedValue) * 100;

  // Sample PropTrack data
  const proptrackData = {
    propertyDetails: {
      address: decision.suburb,
      suburb: decision.suburb.split(',')[0],
      postcode: "2065",
      bedrooms: 4,
      bathrooms: 2,
      parking: 0,
      landSize: 164,
      propertyType: "House",
      lotPlan: "1/516265",
      council: "North Sydney"
    },
    valuation: {
      estimatedValue: proptrackValue,
      lowRange: proptrackValue * 0.95,
      highRange: proptrackValue * 1.05,
      confidence: 85,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      applicationAmount: decision.loanAmount,
      loanAmount: decision.loanAmount
    },
    comparableSales: [
      {
        address: "24 Devonshire Street, Crows Nest, NSW 2065",
        price: proptrackValue * 0.95,
        saleDate: "11 Apr 2024",
        bedrooms: 3,
        bathrooms: 2,
        parking: 1,
        landSize: 184,
        propertyType: "House"
      },
      {
        address: "47 Colin Street, Cammeray, NSW 2062",
        price: proptrackValue * 1.1,
        saleDate: "13 Dec 2023",
        bedrooms: 3,
        bathrooms: 2,
        parking: 1,
        landSize: 247,
        propertyType: "House"
      },
      {
        address: "77 Holtermann Street, Crows Nest, NSW 2065",
        price: proptrackValue * 1.05,
        saleDate: "15 Apr 2024",
        bedrooms: 4,
        bathrooms: 2,
        parking: 1,
        landSize: 215,
        propertyType: "House"
      }
    ],
    propertyHistory: [
      {
        date: "18 Jul 2013",
        price: proptrackValue * 0.5,
        party: "McGrath - Crows Nest"
      },
      {
        date: "10 May 2006",
        price: proptrackValue * 0.3,
        party: "-"
      },
      {
        date: "16 Jun 1999",
        price: proptrackValue * 0.2,
        party: "-"
      }
    ]
  };

  if (!decision) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
          {decision.approved ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span className="font-semibold">Approved</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <XCircle className="h-6 w-6 mr-2" />
              <span className="font-semibold">Not Approved</span>
            </div>
          )}
        </div>

        {/* Property Valuation Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">PropTrack AVM Value</div>
              <div className="text-2xl font-semibold">${proptrackValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Equihome Risk-Adjusted Value</div>
              <div className="text-2xl font-semibold text-indigo-600">${riskAdjustedValue.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Includes 10% standard deviation risk adjustment</div>
            </div>
          </div>
        </div>

        {/* Loan Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-gray-600">Loan Amount</div>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xl font-semibold">${decision.loanAmount.toLocaleString()}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-gray-600">Interest Rate</div>
              <Percent className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xl font-semibold">{decision.interestRate}%</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-gray-600">Risk-Adjusted LTV</div>
              <Target className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-xl font-semibold">{adjustedLTV.toFixed(1)}%</div>
          </div>

          {decision.returns?.optimalExit && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Optimal Exit</div>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">Year {decision.returns.optimalExit.year}</div>
            </div>
          )}
        </div>

        {/* PropTrack Analysis Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowFullReport(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Database className="h-5 w-5 mr-2" />
            View Full PropTrack Report
          </button>
        </div>

        {/* PropTrack Full Report Modal */}
        {showFullReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">PropTrack Property Report</h3>
                <button
                  onClick={() => setShowFullReport(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <PropTrackReport {...proptrackData} />
              </div>
            </div>
          </div>
        )}

        {/* Fund Parameters Analysis */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-gray-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Fund Parameters Analysis</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Maximum LTV:</div>
                <div className="text-sm text-gray-600">Combined LTV including existing mortgage</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">{adjustedLTV.toFixed(1)}% <span className="text-gray-500">(Target: {maxLTV}%)</span></div>
              </div>
            </div>

            {decision.returns?.yearlyBreakdown?.[0] && (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Target IRR:</div>
                  <div className="text-sm text-gray-600">Projected IRR meets minimum return requirements</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-red-600">
                    {decision.returns.yearlyBreakdown[0].irr.toFixed(1)}% 
                    <span className="text-gray-500">(Target: {targetIRR}%)</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Risk Level:</div>
                <div className="text-sm text-gray-600">Risk assessment based on multiple factors</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">{decision.riskLevel} <span className="text-gray-500">(Target: Low to Medium)</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Zone Allocation:</div>
                <div className="text-sm text-gray-600">Property location within approved investment zones</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">{decision.trafficLight} <span className="text-gray-500">(Target: Green/Orange)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Analysis */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-gray-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Zone Analysis - {decision.suburb}</h4>
          </div>
          <p className="text-gray-700 mb-4">{decision.explanation}</p>
          {decision.trafficLight === 'Orange' && (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="text-orange-700">Enhanced due diligence required - conservative LTV limits</p>
            </div>
          )}
        </div>

        {decision.approved && decision.returns?.yearlyBreakdown && (
          <>
            {/* Exit Time Analysis */}
            <ExitTimeAnalysis 
              decision={decision}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />

            {/* Fund Impact Analysis */}
            <FundImpactAnalysis 
              decision={decision}
              selectedYear={selectedYear}
            />
          </>
        )}
      </div>

      {/* Add PropTrack Analysis Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowPropTrack(!showPropTrack)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showPropTrack ? 'Hide PropTrack Analysis' : 'View PropTrack Analysis'}
        </button>
      </div>

      {/* PropTrack Analysis Section */}
      {showPropTrack && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PropTrackAnalysis 
            suburb={decision.suburb} 
            propertyValue={proptrackValue} 
          />
        </div>
      )}
    </div>
  );
};

export default UnderwriteResults;