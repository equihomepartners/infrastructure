import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
const UnderwriteResults = ({ decision }) => {
    const returnData = {
        labels: decision.returns.yearlyBreakdown.map(y => `Year ${y.year}`),
        datasets: [
            {
                label: 'Interest Returns',
                data: decision.returns.yearlyBreakdown.map(y => y.accruedInterest),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            },
            {
                label: 'Appreciation Share',
                data: decision.returns.yearlyBreakdown.map(y => y.appreciationShare),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Projected Returns Breakdown',
                font: {
                    size: 16,
                    weight: 'bold'
                }
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
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Analysis Results" }), decision.approved ? (_jsxs("div", { className: "flex items-center text-green-600", children: [_jsx(CheckCircle, { className: "h-6 w-6 mr-2" }), _jsx("span", { className: "font-semibold", children: "Approved" })] })) : (_jsxs("div", { className: "flex items-center text-red-600", children: [_jsx(XCircle, { className: "h-6 w-6 mr-2" }), _jsx("span", { className: "font-semibold", children: "Not Approved" })] }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Loan Amount" }), _jsxs("div", { className: "text-xl font-semibold", children: ["$", decision.loanAmount.toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Interest Rate" }), _jsxs("div", { className: "text-xl font-semibold", children: [decision.interestRate, "%"] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "LTV Ratio" }), _jsxs("div", { className: "text-xl font-semibold", children: [decision.ltv.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-gray-600 mr-2" }), _jsx("h4", { className: "font-medium text-gray-900", children: "Risk Assessment" })] }), _jsx("div", { className: `text-sm ${decision.riskLevel === 'low'
                            ? 'text-green-600'
                            : decision.riskLevel === 'medium'
                                ? 'text-yellow-600'
                                : 'text-red-600'}`, children: decision.explanation })] }), decision.approved && (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-[300px]", children: _jsx(Line, { data: returnData, options: options }) }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Optimal Exit Analysis" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Recommended Exit" }), _jsxs("div", { className: "text-lg font-semibold", children: ["Year ", decision.returns.optimalExit.year] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Return" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", decision.returns.optimalExit.totalReturn.toLocaleString()] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "ROI" }), _jsxs("div", { className: "text-lg font-semibold", children: [decision.returns.optimalExit.roi.toFixed(2), "%"] })] })] })] })] }))] }));
};
export default UnderwriteResults;
