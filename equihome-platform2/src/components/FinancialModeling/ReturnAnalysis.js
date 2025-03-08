import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { AlertTriangle, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS } from 'chart.js';
// Register the annotation plugin
ChartJS.register(annotationPlugin);
const ReturnAnalysis = ({ modelInputs }) => {
    // Calculate yearly returns for full 10-year term
    const yearlyData = Array.from({ length: 10 }, (_, i) => {
        const year = i + 1;
        const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, year);
        const appreciation = propertyValue - modelInputs.propertyValue;
        const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
        const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, year) - 1);
        const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
        const totalReturn = accruedInterest + appreciationShare + upfrontFee;
        const irr = (Math.pow((totalReturn + modelInputs.loanAmount) / modelInputs.loanAmount, 1 / year) - 1) * 100;
        return {
            year,
            propertyValue,
            appreciation,
            appreciationShare,
            accruedInterest,
            upfrontFee,
            totalReturn,
            irr
        };
    });
    // Get data at desired exit point
    const exitYearIndex = Math.floor(modelInputs.desiredExitYear) - 1;
    const exitData = yearlyData[exitYearIndex];
    // Returns Line Chart Data
    const returnsData = {
        labels: yearlyData.map(d => `Year ${d.year}`),
        datasets: [
            {
                label: 'Interest Returns',
                data: yearlyData.map(d => d.accruedInterest),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                order: 2
            },
            {
                label: 'Appreciation Share',
                data: yearlyData.map(d => d.appreciationShare),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                order: 2
            },
            {
                label: 'Exit Point',
                data: yearlyData.map((d, i) => Math.abs(i + 1 - modelInputs.desiredExitYear) < 0.1 ? d.accruedInterest + d.appreciationShare : null),
                borderColor: '#EF4444',
                backgroundColor: '#EF4444',
                pointStyle: 'star',
                pointRadius: 25,
                pointHoverRadius: 30,
                borderWidth: 3,
                order: 1
            }
        ]
    };
    // IRR Line Chart Data
    const irrData = {
        labels: yearlyData.map(d => `Year ${d.year}`),
        datasets: [
            {
                label: 'IRR',
                data: yearlyData.map(d => d.irr),
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                order: 2
            },
            {
                label: 'Exit Point',
                data: yearlyData.map((d, i) => Math.abs(i + 1 - modelInputs.desiredExitYear) < 0.1 ? d.irr : null),
                borderColor: '#EF4444',
                backgroundColor: '#EF4444',
                pointStyle: 'star',
                pointRadius: 25,
                pointHoverRadius: 30,
                borderWidth: 3,
                order: 1
            }
        ]
    };
    const commonAnnotations = {
        line1: {
            type: 'line',
            xMin: modelInputs.desiredExitYear - 1,
            xMax: modelInputs.desiredExitYear - 1,
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
                display: true,
                content: `Exit Year ${modelInputs.desiredExitYear}`,
                position: 'start'
            }
        }
    };
    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.dataset.label === 'Exit Point') {
                            return `Exit Point (Year ${modelInputs.desiredExitYear})`;
                        }
                        return context.dataset.label + ': ' + context.formattedValue;
                    }
                }
            },
            annotation: {
                annotations: commonAnnotations
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };
    const returnsOptions = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: 'Return Components Over Time',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                ticks: {
                    callback: (value) => `$${(value / 1000).toFixed(0)}k`
                }
            }
        }
    };
    const irrOptions = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: 'IRR Over Time',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                ticks: {
                    callback: (value) => `${value.toFixed(1)}%`
                }
            }
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg", children: _jsxs("div", { className: "flex", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 flex-shrink-0" }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-lg font-medium text-yellow-800", children: "Return Structure" }), _jsxs("div", { className: "mt-2 text-yellow-700", children: [_jsx("p", { className: "mb-2", children: "Returns are realized in two components:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1", children: [_jsxs("li", { children: ["Interest accrual at ", modelInputs.interestRate, "% per year"] }), _jsx("li", { children: "Share of property appreciation based on LTV ratio" }), _jsx("li", { children: "The red star and vertical line indicate your chosen exit point" })] })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: returnsData, options: returnsOptions }) }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: irrData, options: irrOptions }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: ["Return Components at Exit (Year ", modelInputs.desiredExitYear, ")"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Accrued Interest" }), _jsx(DollarSign, { className: "h-4 w-4 text-blue-600" })] }), _jsxs("div", { className: "text-2xl font-semibold text-blue-700", children: ["$", Math.round(exitData.accruedInterest).toLocaleString()] })] }), _jsxs("div", { className: "bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Appreciation Share" }), _jsx(TrendingUp, { className: "h-4 w-4 text-green-600" })] }), _jsxs("div", { className: "text-2xl font-semibold text-green-700", children: ["$", Math.round(exitData.appreciationShare).toLocaleString()] })] }), _jsxs("div", { className: "bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Upfront Fee" }), _jsx(Calculator, { className: "h-4 w-4 text-purple-600" })] }), _jsxs("div", { className: "text-2xl font-semibold text-purple-700", children: ["$", Math.round(exitData.upfrontFee).toLocaleString()] })] }), _jsxs("div", { className: "bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg border-2 border-indigo-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: "Total Return" }), _jsx(DollarSign, { className: "h-4 w-4 text-indigo-600" })] }), _jsxs("div", { className: "text-2xl font-bold text-indigo-700", children: ["$", Math.round(exitData.totalReturn).toLocaleString()] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Analysis by Exit Year" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Exit Year" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total Return" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "IRR" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: yearlyData.map((data) => (_jsxs("tr", { className: data.year === Math.ceil(modelInputs.desiredExitYear) ? 'bg-green-50' : '', children: [_jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["Year ", data.year] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["$", Math.round(data.totalReturn).toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [data.irr.toFixed(2), "%"] })] }, data.year))) })] }) })] })] })] }));
};
export default ReturnAnalysis;
