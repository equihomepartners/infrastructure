import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { CheckCircle, XCircle, MapPin, Target, DollarSign, Percent, Clock, Database } from 'lucide-react';
import { useFundParameters } from '../../store/fundParameters';
import ExitTimeAnalysis from './ExitTimeAnalysis';
import FundImpactAnalysis from './FundImpactAnalysis';
import PropTrackAnalysis from './PropTrackAnalysis';
import PropTrackReport from '../PropTrackReport';
const UnderwriteResults = ({ decision }) => {
    const [showPropTrack, setShowPropTrack] = useState(false);
    const [showFullReport, setShowFullReport] = useState(false);
    const [selectedYear, setSelectedYear] = useState(1);
    const { maxLTV, maxCombinedLTV, targetIRR, zoneAllocation } = useFundParameters();
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
    if (!decision)
        return null;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Analysis Results" }), decision.approved ? (_jsxs("div", { className: "flex items-center text-green-600", children: [_jsx(CheckCircle, { className: "h-6 w-6 mr-2" }), _jsx("span", { className: "font-semibold", children: "Approved" })] })) : (_jsxs("div", { className: "flex items-center text-red-600", children: [_jsx(XCircle, { className: "h-6 w-6 mr-2" }), _jsx("span", { className: "font-semibold", children: "Not Approved" })] }))] }), _jsx("div", { className: "bg-gray-50 p-6 rounded-lg", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "PropTrack AVM Value" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", proptrackValue.toLocaleString()] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Equihome Risk-Adjusted Value" }), _jsxs("div", { className: "text-2xl font-semibold text-indigo-600", children: ["$", riskAdjustedValue.toLocaleString()] }), _jsx("div", { className: "text-xs text-gray-500", children: "Includes 10% standard deviation risk adjustment" })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Loan Amount" }), _jsx(DollarSign, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: ["$", decision.loanAmount.toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Interest Rate" }), _jsx(Percent, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: [decision.interestRate, "%"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Risk-Adjusted LTV" }), _jsx(Target, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: [adjustedLTV.toFixed(1), "%"] })] }), decision.returns?.optimalExit && (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Optimal Exit" }), _jsx(Clock, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("div", { className: "text-xl font-semibold", children: ["Year ", decision.returns.optimalExit.year] })] }))] }), _jsx("div", { className: "flex justify-center", children: _jsxs("button", { onClick: () => setShowFullReport(true), className: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: [_jsx(Database, { className: "h-5 w-5 mr-2" }), "View Full PropTrack Report"] }) }), showFullReport && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 bg-white p-4 border-b flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-semibold", children: "PropTrack Property Report" }), _jsx("button", { onClick: () => setShowFullReport(false), className: "text-gray-500 hover:text-gray-700", children: "\u00D7" })] }), _jsx("div", { className: "p-6", children: _jsx(PropTrackReport, { ...proptrackData }) })] }) })), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Target, { className: "h-5 w-5 text-gray-600 mr-2" }), _jsx("h4", { className: "text-lg font-semibold text-gray-900", children: "Fund Parameters Analysis" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Maximum LTV:" }), _jsx("div", { className: "text-sm text-gray-600", children: "Combined LTV including existing mortgage" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-lg font-semibold text-green-600", children: [adjustedLTV.toFixed(1), "% ", _jsxs("span", { className: "text-gray-500", children: ["(Target: ", maxLTV, "%)"] })] }) })] }), decision.returns?.yearlyBreakdown?.[0] && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Target IRR:" }), _jsx("div", { className: "text-sm text-gray-600", children: "Projected IRR meets minimum return requirements" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-lg font-semibold text-red-600", children: [decision.returns.yearlyBreakdown[0].irr.toFixed(1), "%", _jsxs("span", { className: "text-gray-500", children: ["(Target: ", targetIRR, "%)"] })] }) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Risk Level:" }), _jsx("div", { className: "text-sm text-gray-600", children: "Risk assessment based on multiple factors" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-lg font-semibold text-green-600", children: [decision.riskLevel, " ", _jsx("span", { className: "text-gray-500", children: "(Target: Low to Medium)" })] }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Zone Allocation:" }), _jsx("div", { className: "text-sm text-gray-600", children: "Property location within approved investment zones" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-lg font-semibold text-green-600", children: [decision.trafficLight, " ", _jsx("span", { className: "text-gray-500", children: "(Target: Green/Orange)" })] }) })] })] })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(MapPin, { className: "h-5 w-5 text-gray-600 mr-2" }), _jsxs("h4", { className: "text-lg font-semibold text-gray-900", children: ["Zone Analysis - ", decision.suburb] })] }), _jsx("p", { className: "text-gray-700 mb-4", children: decision.explanation }), decision.trafficLight === 'Orange' && (_jsx("div", { className: "bg-orange-50 border-l-4 border-orange-400 p-4", children: _jsx("p", { className: "text-orange-700", children: "Enhanced due diligence required - conservative LTV limits" }) }))] }), decision.approved && decision.returns?.yearlyBreakdown && (_jsxs(_Fragment, { children: [_jsx(ExitTimeAnalysis, { decision: decision, selectedYear: selectedYear, onYearChange: setSelectedYear }), _jsx(FundImpactAnalysis, { decision: decision, selectedYear: selectedYear })] }))] }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { onClick: () => setShowPropTrack(!showPropTrack), className: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: showPropTrack ? 'Hide PropTrack Analysis' : 'View PropTrack Analysis' }) }), showPropTrack && (_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsx(PropTrackAnalysis, { suburb: decision.suburb, propertyValue: proptrackValue }) }))] }));
};
export default UnderwriteResults;
