import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
const RiskMetrics = () => {
    const ltvData = {
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
        datasets: [
            {
                label: 'Portfolio LTV',
                data: [33.5, 32.8, 32.1, 31.5, 29.84],
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 40,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    callback: (value) => `${value}%`,
                    font: {
                        size: 14
                    }
                }
            },
            x: {
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
    return (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("div", { className: "text-[48px] font-bold text-blue-600", children: "29.84%" }), _jsx("div", { className: "text-lg text-gray-600", children: "Average LTV" })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("div", { className: "text-[48px] font-bold text-green-600", children: "0.0%" }), _jsx("div", { className: "text-lg text-gray-600", children: "Default Rate" })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("div", { className: "text-[48px] font-bold text-blue-600", children: "92%" }), _jsx("div", { className: "text-lg text-gray-600", children: "Green Zone Assets" })] })] }), _jsxs("div", { className: "bg-gray-50 p-12 rounded-xl", children: [_jsxs("div", { className: "max-w-3xl mb-12", children: [_jsx("h3", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Conservative LTV Trend" }), _jsx("p", { className: "text-gray-600", children: "Our portfolio maintains consistently low LTV ratios, providing significant downside protection while delivering strong risk-adjusted returns." })] }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: ltvData, options: options }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Risk Management Framework" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-blue-600 mb-2", children: "75%" }), _jsx("div", { className: "text-gray-600", children: "Maximum LTV threshold" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-blue-600 mb-2", children: "25%" }), _jsx("div", { className: "text-gray-600", children: "Maximum suburb exposure" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-blue-600 mb-2", children: "90%" }), _jsx("div", { className: "text-gray-600", children: "Green zone target allocation" })] })] })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Geographic Risk Controls" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "Premium" }), _jsx("div", { className: "text-gray-600", children: "Focus on premium Sydney suburbs" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "Strong" }), _jsx("div", { className: "text-gray-600", children: "Employment markets & income levels" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "Limited" }), _jsx("div", { className: "text-gray-600", children: "New supply in target areas" })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Underwriting Controls" }), _jsxs("ul", { className: "space-y-3 text-gray-600", children: [_jsx("li", { children: "\u2022 Automated valuation models" }), _jsx("li", { children: "\u2022 Conservative value adjustments" }), _jsx("li", { children: "\u2022 Strict borrower criteria" }), _jsx("li", { children: "\u2022 Regular portfolio monitoring" })] })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Market Risk Mitigation" }), _jsxs("ul", { className: "space-y-3 text-gray-600", children: [_jsx("li", { children: "\u2022 Geographic diversification" }), _jsx("li", { children: "\u2022 Property type restrictions" }), _jsx("li", { children: "\u2022 Market cycle analysis" }), _jsx("li", { children: "\u2022 Macro trend monitoring" })] })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Operational Controls" }), _jsxs("ul", { className: "space-y-3 text-gray-600", children: [_jsx("li", { children: "\u2022 AI-driven risk assessment" }), _jsx("li", { children: "\u2022 Real-time monitoring" }), _jsx("li", { children: "\u2022 Regular stress testing" }), _jsx("li", { children: "\u2022 Automated alerts system" })] })] })] })] }));
};
export default RiskMetrics;
