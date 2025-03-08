import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
const SensitivityAnalysis = ({ modelInputs }) => {
    // Generate sensitivity ranges
    const growthRateRange = Array.from({ length: 11 }, (_, i) => modelInputs.growthRate - 5 + i);
    const ltvRange = Array.from({ length: 11 }, (_, i) => 15 + i * 5);
    // Calculate returns for different growth rates
    const growthSensitivity = growthRateRange.map(rate => {
        const finalPropertyValue = modelInputs.propertyValue * Math.pow(1 + rate / 100, modelInputs.loanTerm);
        const appreciation = finalPropertyValue - modelInputs.propertyValue;
        const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
        const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, modelInputs.loanTerm) - 1);
        const totalReturn = accruedInterest + appreciationShare + (modelInputs.loanAmount * (modelInputs.upfrontFee / 100));
        const roi = (totalReturn / modelInputs.loanAmount) * 100;
        return {
            rate,
            roi
        };
    });
    // Calculate returns for different LTVs
    const ltvSensitivity = ltvRange.map(ltv => {
        const loanAmount = (modelInputs.propertyValue * ltv) / 100;
        const finalPropertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, modelInputs.loanTerm);
        const appreciation = finalPropertyValue - modelInputs.propertyValue;
        const appreciationShare = appreciation * (loanAmount / modelInputs.propertyValue);
        const accruedInterest = loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, modelInputs.loanTerm) - 1);
        const totalReturn = accruedInterest + appreciationShare + (loanAmount * (modelInputs.upfrontFee / 100));
        const roi = (totalReturn / loanAmount) * 100;
        return {
            ltv,
            roi
        };
    });
    const growthData = {
        labels: growthRateRange.map(rate => `${rate.toFixed(1)}%`),
        datasets: [{
                label: 'ROI Sensitivity to Growth Rate',
                data: growthSensitivity.map(d => d.roi),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }]
    };
    const ltvData = {
        labels: ltvRange.map(ltv => `${ltv}%`),
        datasets: [{
                label: 'ROI Sensitivity to LTV',
                data: ltvSensitivity.map(d => d.roi),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'ROI (%)'
                },
                ticks: {
                    callback: (value) => `${value.toFixed(1)}%`
                }
            }
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Growth Rate Sensitivity" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: growthData, options: options }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "LTV Sensitivity" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: ltvData, options: options }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Growth Rate Impact" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Growth Rate" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ROI" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: growthSensitivity.map((data) => (_jsxs("tr", { children: [_jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [data.rate.toFixed(1), "%"] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [data.roi.toFixed(2), "%"] })] }, data.rate))) })] }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "LTV Impact" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "LTV" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ROI" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: ltvSensitivity.map((data) => (_jsxs("tr", { children: [_jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [data.ltv, "%"] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [data.roi.toFixed(2), "%"] })] }, data.ltv))) })] }) })] })] })] }));
};
export default SensitivityAnalysis;
