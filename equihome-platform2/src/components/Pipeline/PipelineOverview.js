import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from 'react-chartjs-2';
import { DollarSign, Target, Users, Clock, Percent } from 'lucide-react';
import { useFundParameters } from '../../store/fundParameters';
import { pipelineDeals } from '../../data/pipelineData';
const PipelineOverview = () => {
    const { targetIRR, maxLTV, remainingAllocation } = useFundParameters();
    // Filter approved deals (score >= 80)
    const approvedDeals = pipelineDeals.filter(deal => deal.underwriteScore >= 80);
    // Calculate key metrics
    const metrics = {
        averagePropertyValue: pipelineDeals.reduce((sum, deal) => sum + deal.propertyDetails.currentValue, 0) / pipelineDeals.length,
        averageLoanSize: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.amount, 0) / pipelineDeals.length,
        averageApprovedIRR: approvedDeals.reduce((sum, deal) => sum + deal.returns.forecastedIrr, 0) / approvedDeals.length,
        totalPipelineVolume: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.amount, 0),
        highQualityDeals: pipelineDeals.filter(deal => deal.underwriteScore >= 80).length,
        mediumQualityDeals: pipelineDeals.filter(deal => deal.underwriteScore >= 60 && deal.underwriteScore < 80).length,
        lowQualityDeals: pipelineDeals.filter(deal => deal.underwriteScore < 60).length,
        noMortgageDeals: pipelineDeals.filter(deal => deal.loanRequest.existingMortgage === 0).length,
        firstMortgageRepayment: pipelineDeals.filter(deal => deal.loanRequest.purpose === 'First Mortgage Repayment').length,
        // Additional metrics
        totalApplications: pipelineDeals.length,
        averageLTV: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.ltv, 0) / pipelineDeals.length,
        approvalRate: (approvedDeals.length / pipelineDeals.length) * 100
    };
    // Quality distribution data
    const qualityData = {
        labels: ['High Quality (≥80)', 'Medium Quality (60-79)', 'Low Quality (<60)'],
        datasets: [{
                data: [metrics.highQualityDeals, metrics.mediumQualityDeals, metrics.lowQualityDeals],
                backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
                borderRadius: 8
            }]
    };
    // Approved Deals IRR Distribution
    const approvedIRRData = {
        labels: approvedDeals.map(deal => deal.propertyDetails.address.split(',')[0]),
        datasets: [{
                label: 'Forecasted IRR',
                data: approvedDeals.map(deal => deal.returns.forecastedIrr),
                backgroundColor: approvedDeals.map(deal => deal.returns.forecastedIrr >= targetIRR ? '#22c55e' : '#eab308'),
                borderRadius: 8
            }]
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Pipeline Summary" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "bg-gray-50 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total Applications" }), _jsx("p", { className: "text-2xl font-semibold mt-1", children: metrics.totalApplications })] }), _jsx(Users, { className: "h-8 w-8 text-blue-600" })] }) }), _jsx("div", { className: "bg-gray-50 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Pipeline Volume" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", (metrics.totalPipelineVolume / 1000000).toFixed(1), "M"] })] }), _jsx(DollarSign, { className: "h-8 w-8 text-green-600" })] }) }), _jsx("div", { className: "bg-gray-50 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Approval Rate" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [metrics.approvalRate.toFixed(1), "%"] })] }), _jsx(Target, { className: "h-8 w-8 text-purple-600" })] }) }), _jsx("div", { className: "bg-gray-50 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average LTV" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [metrics.averageLTV.toFixed(1), "%"] })] }), _jsx(Percent, { className: "h-8 w-8 text-yellow-600" })] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Deal Quality Distribution" }), _jsx("div", { className: "h-[300px]", children: _jsx(Bar, { data: qualityData, options: {
                                        indexAxis: 'y',
                                        plugins: {
                                            legend: { display: false }
                                        }
                                    } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Forecasted Approved Deal IRRs" }), _jsx("div", { className: "h-[300px]", children: _jsx(Bar, { data: approvedIRRData, options: {
                                        plugins: {
                                            legend: { display: false }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'IRR (%)'
                                                }
                                            }
                                        }
                                    } }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Deal Type Analysis" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "No Existing Mortgage" }), _jsx("span", { className: "font-medium", children: metrics.noMortgageDeals })] }), _jsx("div", { className: "h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-green-600 rounded-full", style: { width: `${(metrics.noMortgageDeals / pipelineDeals.length) * 100}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "First Mortgage Repayment" }), _jsx("span", { className: "font-medium", children: metrics.firstMortgageRepayment })] }), _jsx("div", { className: "h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-blue-600 rounded-full", style: { width: `${(metrics.firstMortgageRepayment / pipelineDeals.length) * 100}%` } }) })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Risk Analysis" }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: _jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "Average Property Value" }), _jsxs("span", { className: "font-medium", children: ["$", (metrics.averagePropertyValue / 1000000).toFixed(1), "M"] })] }) }), _jsx("div", { children: _jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "Average Loan Size" }), _jsxs("span", { className: "font-medium", children: ["$", (metrics.averageLoanSize / 1000000).toFixed(1), "M"] })] }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "Average Approved IRR" }), _jsxs("span", { className: "font-medium", children: [metrics.averageApprovedIRR.toFixed(1), "%"] })] }), _jsx("div", { children: _jsxs("div", { className: "text-xs text-gray-500 mt-1", children: ["vs Target ", targetIRR, "%"] }) })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Pipeline Health" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "Pipeline Coverage" }), _jsxs("span", { className: "font-medium", children: [((metrics.totalPipelineVolume / remainingAllocation) * 100).toFixed(1), "%"] })] }), _jsx("div", { className: "h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-indigo-600 rounded-full", style: { width: `${Math.min((metrics.totalPipelineVolume / remainingAllocation) * 100, 100)}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-600", children: "High Quality Ratio" }), _jsxs("span", { className: "font-medium", children: [((metrics.highQualityDeals / pipelineDeals.length) * 100).toFixed(1), "%"] })] }), _jsx("div", { className: "h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-green-600 rounded-full", style: { width: `${(metrics.highQualityDeals / pipelineDeals.length) * 100}%` } }) })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Processing Times" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Initial Review" })] }), _jsx("p", { className: "text-2xl font-semibold", children: "2.4 days" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Clock, { className: "h-5 w-5 text-green-600 mr-2" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Due Diligence" })] }), _jsx("p", { className: "text-2xl font-semibold", children: "5.2 days" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Clock, { className: "h-5 w-5 text-yellow-600 mr-2" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Final Approval" })] }), _jsx("p", { className: "text-2xl font-semibold", children: "1.8 days" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Clock, { className: "h-5 w-5 text-purple-600 mr-2" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Total Time" })] }), _jsx("p", { className: "text-2xl font-semibold", children: "9.4 days" })] })] })] })] }));
};
export default PipelineOverview;
