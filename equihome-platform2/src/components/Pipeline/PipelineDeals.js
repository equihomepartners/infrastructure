import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowUpDown, Calendar, Home, DollarSign, Percent, AlertTriangle, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { pipelineDeals } from '../../data/pipelineData';
import { useFundParameters } from '../../store/fundParameters';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from '../ui/table';
const PipelineDeals = () => {
    const [expandedDeal, setExpandedDeal] = useState(null);
    const [sortField, setSortField] = useState('applicationDate');
    const [sortDirection, setSortDirection] = useState('desc');
    const { maxLTV, targetIRR } = useFundParameters();
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    const renderSortIcon = (field) => (_jsx(ArrowUpDown, { className: `ml-2 h-4 w-4 ${sortField === field ? 'opacity-100' : 'opacity-50'}` }));
    const sortedDeals = useMemo(() => {
        return [...pipelineDeals].sort((a, b) => {
            let compareValueA = 0;
            let compareValueB = 0;
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
    const renderReturnProjections = (deal) => {
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
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`
                    }
                }
            }
        };
        return (_jsx("div", { className: "h-[300px] mt-4", children: _jsx(Line, { data: data, options: options }) }));
    };
    return (_jsx("div", { className: "space-y-4", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[50px]" }), _jsx(TableHead, { onClick: () => handleSort('applicationDate'), className: "cursor-pointer", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2" }), "Application Date", renderSortIcon('applicationDate')] }) }), _jsx(TableHead, { onClick: () => handleSort('propertyValue'), className: "cursor-pointer", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Home, { className: "h-4 w-4 mr-2" }), "Property Value", renderSortIcon('propertyValue')] }) }), _jsx(TableHead, { onClick: () => handleSort('loanAmount'), className: "cursor-pointer", children: _jsxs("div", { className: "flex items-center", children: [_jsx(DollarSign, { className: "h-4 w-4 mr-2" }), "Loan Request", renderSortIcon('loanAmount')] }) }), _jsx(TableHead, { onClick: () => handleSort('ltv'), className: "cursor-pointer", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Percent, { className: "h-4 w-4 mr-2" }), "Combined LTV", renderSortIcon('ltv')] }) }), _jsx(TableHead, { onClick: () => handleSort('underwriteScore'), className: "cursor-pointer", children: _jsxs("div", { className: "flex items-center", children: [_jsx(AlertTriangle, { className: "h-4 w-4 mr-2" }), "Underwrite Score", renderSortIcon('underwriteScore')] }) }), _jsx(TableHead, { onClick: () => handleSort('forecastedIrr'), className: "cursor-pointer", children: _jsxs("div", { className: "flex items-center", children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-2" }), "Forecasted IRR", renderSortIcon('forecastedIrr')] }) })] }) }), _jsx(TableBody, { children: sortedDeals.map((deal) => (_jsxs(React.Fragment, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx("button", { onClick: () => setExpandedDeal(expandedDeal === deal.id ? null : deal.id), className: "p-1 hover:bg-gray-100 rounded", children: expandedDeal === deal.id ? (_jsx(ChevronUp, { className: "h-4 w-4" })) : (_jsx(ChevronDown, { className: "h-4 w-4" })) }) }), _jsxs(TableCell, { children: [_jsx("div", { className: "font-medium", children: new Date(deal.applicationDate).toLocaleDateString() }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Release: ", new Date(deal.expectedFundingDate).toLocaleDateString()] })] }), _jsxs(TableCell, { children: [_jsxs("div", { className: "font-medium", children: ["$", (deal.propertyDetails.currentValue / 1000000).toFixed(1), "M"] }), _jsx("div", { className: "text-sm text-gray-500", children: deal.propertyDetails.address })] }), _jsxs(TableCell, { children: [_jsxs("div", { className: "font-medium", children: ["$", (deal.loanRequest.amount / 1000000).toFixed(1), "M"] }), _jsx("div", { className: "text-sm text-gray-500", children: deal.loanRequest.purpose })] }), _jsxs(TableCell, { children: [_jsxs("div", { className: "font-medium", children: [((deal.loanRequest.amount + deal.loanRequest.existingMortgage) /
                                                        deal.propertyDetails.currentValue * 100).toFixed(1), "%"] }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Existing: $", (deal.loanRequest.existingMortgage / 1000000).toFixed(1), "M"] })] }), _jsx(TableCell, { children: _jsx("div", { className: `font-medium ${deal.underwriteScore >= 80 ? 'text-green-600' :
                                                deal.underwriteScore >= 60 ? 'text-yellow-600' :
                                                    'text-red-600'}`, children: deal.underwriteScore }) }), _jsx(TableCell, { children: _jsxs("div", { className: "font-medium", children: [deal.returns.forecastedIrr.toFixed(1), "%"] }) })] }), expandedDeal === deal.id && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 7, children: _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Property Details" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Risk Adjustment" }), _jsxs("span", { children: [deal.propertyDetails.riskAdjustment, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Growth Rate" }), _jsxs("span", { children: [deal.propertyDetails.forecastedGrowthRate, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Median Price (Similar)" }), _jsxs("span", { children: ["$", (deal.propertyDetails.medianPriceByType / 1000000).toFixed(1), "M"] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Borrower Details" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Name" }), _jsx("span", { children: deal.borrowerDetails.name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Income" }), _jsxs("span", { children: ["$", deal.borrowerDetails.income.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Occupation" }), _jsx("span", { children: deal.borrowerDetails.occupation })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Return Projections" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Forecasted IRR" }), _jsxs("span", { children: [deal.returns.forecastedIrr, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "5-Year Return" }), _jsxs("span", { children: ["$", deal.returns.yearlyProjections[4].totalReturn.toLocaleString()] })] })] })] })] }), renderReturnProjections(deal)] }) }) }))] }, deal.id))) })] }) }));
};
export default PipelineDeals;
