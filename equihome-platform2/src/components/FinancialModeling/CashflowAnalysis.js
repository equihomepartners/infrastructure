import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { AlertTriangle } from 'lucide-react';
const CashflowAnalysis = ({ modelInputs }) => {
    // Calculate yearly returns for full 10-year term
    const yearlyData = Array.from({ length: 10 }, (_, i) => {
        const year = i + 1;
        const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, year);
        const appreciation = propertyValue - modelInputs.propertyValue;
        const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
        const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, year) - 1);
        const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
        return {
            year,
            propertyValue,
            appreciation,
            appreciationShare,
            accruedInterest,
            upfrontFee,
            totalReturn: accruedInterest + appreciationShare + upfrontFee,
            roi: ((accruedInterest + appreciationShare + upfrontFee) / modelInputs.loanAmount) * 100
        };
    });
    // Get data at desired exit point
    const exitYearIndex = Math.floor(modelInputs.desiredExitYear) - 1;
    const exitData = yearlyData[exitYearIndex];
    const exitFraction = modelInputs.desiredExitYear % 1;
    // If there's a fractional year, interpolate the values
    const actualExitData = exitFraction === 0 ? exitData : {
        year: modelInputs.desiredExitYear,
        propertyValue: modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, modelInputs.desiredExitYear),
        appreciation: 0, // Will be calculated below
        appreciationShare: 0,
        accruedInterest: modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, modelInputs.desiredExitYear) - 1),
        upfrontFee: modelInputs.loanAmount * (modelInputs.upfrontFee / 100),
        totalReturn: 0,
        roi: 0
    };
    if (exitFraction > 0) {
        actualExitData.appreciation = actualExitData.propertyValue - modelInputs.propertyValue;
        actualExitData.appreciationShare = actualExitData.appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
        actualExitData.totalReturn = actualExitData.accruedInterest + actualExitData.appreciationShare + actualExitData.upfrontFee;
        actualExitData.roi = (actualExitData.totalReturn / modelInputs.loanAmount) * 100;
    }
    const data = {
        labels: yearlyData.map(d => `Year ${d.year}`),
        datasets: [
            {
                label: 'Property Value',
                data: yearlyData.map(d => d.propertyValue),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'Potential Return at Exit',
                data: yearlyData.map(d => d.totalReturn),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Property Value & Return Projection',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            annotation: {
                annotations: {
                    exitPoint: {
                        type: 'line',
                        xMin: modelInputs.desiredExitYear - 1,
                        xMax: modelInputs.desiredExitYear - 1,
                        borderColor: '#EF4444',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                            content: 'Exit Point',
                            enabled: true,
                            position: 'top'
                        }
                    }
                }
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Property Value ($)'
                },
                ticks: {
                    callback: (value) => `$${(value / 1000000).toFixed(1)}M`
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Return at Exit ($)'
                },
                ticks: {
                    callback: (value) => `$${(value / 1000).toFixed(0)}K`
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg", children: _jsxs("div", { className: "flex", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 flex-shrink-0" }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-lg font-medium text-yellow-800", children: "Important Note About Returns" }), _jsxs("div", { className: "mt-2 text-yellow-700", children: [_jsx("p", { className: "mb-2", children: "This is not a traditional cashflow investment. All returns (interest + appreciation share) are realized as a single event at exit:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1", children: [_jsx("li", { children: "No periodic payments during the term" }), _jsx("li", { children: "Returns accumulate but are only realized at exit" }), _jsx("li", { children: "Early exit is possible but affects total returns" }), _jsx("li", { children: "The vertical line indicates your chosen exit point" })] })] })] })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsx("div", { className: "h-[500px]", children: _jsx(Line, { data: data, options: options }) }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: ["Return at Exit (Year ", modelInputs.desiredExitYear, ")"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Accrued Interest" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", Math.round(actualExitData.accruedInterest).toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Appreciation Share" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", Math.round(actualExitData.appreciationShare).toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Upfront Fee" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", Math.round(actualExitData.upfrontFee).toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Return at Exit" }), _jsxs("div", { className: "text-2xl font-semibold text-green-600", children: ["$", Math.round(actualExitData.totalReturn).toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "ROI at Exit" }), _jsxs("div", { className: "text-2xl font-semibold text-blue-600", children: [actualExitData.roi.toFixed(2), "%"] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Potential Returns by Exit Year" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Exit Year" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Property Value" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total Return" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ROI" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: yearlyData.map((data) => (_jsxs("tr", { className: data.year === Math.ceil(modelInputs.desiredExitYear) ? 'bg-green-50' : '', children: [_jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["Year ", data.year] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["$", Math.round(data.propertyValue).toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["$", Math.round(data.totalReturn).toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [data.roi.toFixed(2), "%"] })] }, data.year))) })] }) })] })] })] }));
};
export default CashflowAnalysis;
