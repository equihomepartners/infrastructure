import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from 'react-chartjs-2';
const PortfolioMetrics = () => {
    const ltvData = {
        labels: ['Low LTV (<65%)', 'Medium LTV (65-80%)', 'High LTV (80%+)'],
        datasets: [
            {
                data: [53, 38, 8],
                backgroundColor: '#2563EB',
                borderRadius: 8,
                barThickness: 40
            }
        ]
    };
    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 60,
                grid: {
                    display: false
                },
                ticks: {
                    callback: (value) => `${value}%`,
                    font: {
                        size: 14
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 14
                    }
                }
            }
        }
    };
    return (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { className: "bg-gray-50 p-12 rounded-xl", children: [_jsxs("div", { className: "max-w-3xl mb-12", children: [_jsx("h3", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "The majority of loan-to-value (LTV) ratios are low (<65%)" }), _jsx("p", { className: "text-gray-600", children: "Equihome maintains conservative LTV ratios across the portfolio, with a median LTV of 29.84% at origination. This approach provides significant downside protection while maintaining attractive returns." })] }), _jsx("div", { className: "h-[300px]", children: _jsx(Bar, { data: ltvData, options: options }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Portfolio Statistics" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Average Property Value" }), _jsx("div", { className: "text-2xl font-semibold", children: "$1.9M" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Average Loan Size" }), _jsx("div", { className: "text-2xl font-semibold", children: "$595K" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Average Term" }), _jsx("div", { className: "text-2xl font-semibold", children: "7.2 years" })] })] })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Risk Metrics" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Default Rate" }), _jsx("div", { className: "text-2xl font-semibold text-green-600", children: "0.0%" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Green Zone Exposure" }), _jsx("div", { className: "text-2xl font-semibold", children: "92%" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Avg Property Growth" }), _jsx("div", { className: "text-2xl font-semibold", children: "8.2%" })] })] })] })] })] }));
};
export default PortfolioMetrics;
