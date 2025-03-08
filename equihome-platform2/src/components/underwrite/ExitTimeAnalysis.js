import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from 'react-chartjs-2';
const ExitTimeAnalysis = ({ decision, selectedYear, onYearChange }) => {
    const yearData = decision.returns.yearlyBreakdown[selectedYear - 1];
    // Bar chart data
    const barData = {
        labels: ['Returns Breakdown'],
        datasets: [
            {
                label: 'Interest Charged',
                data: [yearData.accruedInterest],
                backgroundColor: '#3B82F6',
            },
            {
                label: 'Appreciation Fee',
                data: [yearData.appreciationShare],
                backgroundColor: '#10B981',
            }
        ]
    };
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Returns Breakdown at Exit',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                stacked: true,
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`
                }
            },
            x: {
                stacked: true
            }
        }
    };
    return (_jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("label", { className: "block text-lg font-semibold text-gray-900 mb-2", children: ["Exit Year: ", _jsx("span", { className: "text-indigo-600", children: selectedYear })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "range", min: "1", max: decision.returns.yearlyBreakdown.length, value: selectedYear, onChange: (e) => onYearChange(Number(e.target.value)), className: "w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700", style: {
                                    background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${(selectedYear / decision.returns.yearlyBreakdown.length) * 100}%, #E5E7EB ${(selectedYear / decision.returns.yearlyBreakdown.length) * 100}%, #E5E7EB 100%)`
                                } }), _jsxs("div", { className: "absolute -bottom-6 left-0 right-0 flex justify-between text-sm font-medium", children: [_jsx("span", { className: "text-indigo-600", children: "Year 1" }), _jsxs("span", { className: "text-indigo-600", children: ["Year ", decision.returns.yearlyBreakdown.length] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6", children: [_jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-indigo-100", children: [_jsx("div", { className: "text-sm text-indigo-600 font-medium", children: "Total Return at Exit" }), _jsxs("div", { className: "text-2xl font-bold text-indigo-700", children: ["$", yearData.totalReturn.toLocaleString()] })] }), _jsxs("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100", children: [_jsx("div", { className: "text-sm text-green-600 font-medium", children: "IRR at Exit" }), _jsxs("div", { className: "text-2xl font-bold text-green-700", children: [yearData.irr.toFixed(2), "%"] })] }), _jsxs("div", { className: "bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100", children: [_jsx("div", { className: "text-sm text-purple-600 font-medium", children: "Interest Charged" }), _jsxs("div", { className: "text-2xl font-bold text-purple-700", children: ["$", yearData.accruedInterest.toLocaleString()] })] }), _jsxs("div", { className: "bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100", children: [_jsx("div", { className: "text-sm text-pink-600 font-medium", children: "Appreciation Fee" }), _jsxs("div", { className: "text-2xl font-bold text-pink-700", children: ["$", yearData.appreciationShare.toLocaleString()] })] })] }), _jsx("div", { className: "h-[300px]", children: _jsx(Bar, { data: barData, options: barOptions }) })] }));
};
export default ExitTimeAnalysis;
