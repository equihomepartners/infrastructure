import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';
import { useFundParameters } from '../../store/fundParameters';
import { pipelineDeals } from '../../data/pipelineData';
const PipelineAnalytics = () => {
    const { targetIRR, maxLTV, remainingAllocation } = useFundParameters();
    // Filter approved deals (score >= 80)
    const approvedDeals = pipelineDeals.filter(deal => deal.underwriteScore >= 80);
    // Calculate metrics
    const metrics = {
        totalVolume: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.amount, 0),
        approvedVolume: approvedDeals.reduce((sum, deal) => sum + deal.loanRequest.amount, 0),
        averageIRR: approvedDeals.reduce((sum, deal) => sum + deal.returns.forecastedIrr, 0) / approvedDeals.length,
        averageLTV: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.ltv, 0) / pipelineDeals.length
    };
    // Sort deals by date for trend analysis
    const sortedDeals = [...pipelineDeals].sort((a, b) => new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime());
    // Prepare trend data
    const trendData = {
        labels: sortedDeals.map(deal => new Date(deal.applicationDate).toLocaleDateString()),
        datasets: [
            {
                label: 'Pipeline Volume ($M)',
                data: sortedDeals.map(deal => deal.loanRequest.amount / 1000000),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Approved Volume ($M)',
                data: sortedDeals.map(deal => deal.underwriteScore >= 80 ? deal.loanRequest.amount / 1000000 : 0),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    // Quality distribution data
    const qualityData = {
        labels: ['High (≥80)', 'Medium (60-79)', 'Low (<60)'],
        datasets: [{
                data: [
                    pipelineDeals.filter(deal => deal.underwriteScore >= 80).length,
                    pipelineDeals.filter(deal => deal.underwriteScore >= 60 && deal.underwriteScore < 80).length,
                    pipelineDeals.filter(deal => deal.underwriteScore < 60).length
                ],
                backgroundColor: ['#22c55e', '#eab308', '#ef4444']
            }]
    };
    // IRR distribution for approved deals
    const irrData = {
        labels: approvedDeals.map(deal => deal.propertyDetails.address.split(',')[0]),
        datasets: [{
                label: 'Forecasted IRR',
                data: approvedDeals.map(deal => deal.returns.forecastedIrr),
                backgroundColor: approvedDeals.map(deal => deal.returns.forecastedIrr >= targetIRR ? '#22c55e' : '#eab308')
            }]
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total Pipeline Volume" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", (metrics.totalVolume / 1000000).toFixed(1), "M"] })] }), _jsx(DollarSign, { className: "h-8 w-8 text-blue-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Approved Volume" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", (metrics.approvedVolume / 1000000).toFixed(1), "M"] })] }), _jsx(Building2, { className: "h-8 w-8 text-green-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average IRR" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [metrics.averageIRR.toFixed(1), "%"] })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-yellow-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Average LTV" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [metrics.averageLTV.toFixed(1), "%"] })] }), _jsx(Percent, { className: "h-8 w-8 text-purple-600" })] }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Pipeline Volume Trend" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: trendData, options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Volume ($M)'
                                        }
                                    }
                                }
                            } }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Deal Quality Distribution" }), _jsx("div", { className: "h-[300px]", children: _jsx(Bar, { data: qualityData, options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Forecasted Approved Deal IRRs" }), _jsx("div", { className: "h-[300px]", children: _jsx(Bar, { data: irrData, options: {
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
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
                                    } }) })] })] })] }));
};
export default PipelineAnalytics;
