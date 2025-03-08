import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { commonOptions } from '../fund/ChartConfig';
const AssetClassComparison = () => {
    const data = {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Equihome Portfolio',
                data: [15.8, 16.2, 16.8, 17.4, 18.1, 16.61],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                borderWidth: 3
            },
            {
                label: 'Sydney Premium Real Estate',
                data: [10.2, 10.7, 11.1, 10.8, 10.4, 10.7],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                borderWidth: 3
            },
            {
                label: 'S&P 500',
                data: [12.5, 13.8, 14.2, 9.8, 10.2, 11.4],
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                borderWidth: 3
            },
            {
                label: 'ASX 200',
                data: [9.8, 8.9, 10.2, 9.4, 9.8, 10.1],
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                borderWidth: 3
            },
            {
                label: 'US Real Estate',
                data: [8.9, 9.2, 9.8, 8.7, 8.9, 9.1],
                borderColor: '#EC4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                tension: 0.4,
                borderWidth: 3
            }
        ]
    };
    return (_jsxs("div", { className: "space-y-12", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8", children: [_jsxs("div", { className: "max-w-3xl mb-8", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Asset Class Performance" }), _jsx("p", { className: "text-gray-600", children: "Equihome's innovative model creates a new asset class that consistently outperforms traditional investment options while maintaining strong downside protection through its asset-backed structure." })] }), _jsx("div", { className: "h-[500px]", children: _jsx(Line, { data: data, options: {
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: {
                                        display: true,
                                        text: 'Historical IRR by Asset Class',
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
                                            callback: (value) => `${value}%`,
                                            font: {
                                                size: 14
                                            }
                                        },
                                        grid: {
                                            color: 'rgba(0, 0, 0, 0.1)',
                                            drawBorder: false
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
                            } }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Key Performance Metrics" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "5-Year Average IRR" }), _jsx("div", { className: "text-2xl font-bold text-indigo-600", children: "16.61%" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-600", children: "vs S&P 500" }), _jsx("div", { className: "text-lg font-semibold text-green-600", children: "+5.21%" })] })] }), _jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Volatility" }), _jsx("div", { className: "text-2xl font-bold text-indigo-600", children: "4.2%" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-600", children: "vs ASX 200" }), _jsx("div", { className: "text-lg font-semibold text-green-600", children: "-8.3%" })] })] }), _jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-600", children: "Downside Protection" }), _jsx("div", { className: "text-2xl font-bold text-indigo-600", children: "70.16%" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Equity Buffer" }), _jsx("div", { className: "text-lg font-semibold text-green-600", children: "Strong" })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Asset Class Comparison" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Traditional Real Estate" }), _jsxs("ul", { className: "space-y-2 text-gray-600", children: [_jsx("li", { children: "\u2022 Higher entry costs (20-30% down payment)" }), _jsx("li", { children: "\u2022 Active management required" }), _jsx("li", { children: "\u2022 Lower liquidity" }), _jsx("li", { children: "\u2022 Full market exposure" })] })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Public Equities" }), _jsxs("ul", { className: "space-y-2 text-gray-600", children: [_jsx("li", { children: "\u2022 Higher volatility" }), _jsx("li", { children: "\u2022 No asset backing" }), _jsx("li", { children: "\u2022 Market correlation" }), _jsx("li", { children: "\u2022 Complex valuations" })] })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Equihome Model" }), _jsxs("ul", { className: "space-y-2 text-gray-600", children: [_jsx("li", { children: "\u2022 Asset-backed security" }), _jsx("li", { children: "\u2022 No active management needed" }), _jsx("li", { children: "\u2022 Strong downside protection" }), _jsx("li", { children: "\u2022 Premium market exposure" })] })] })] })] })] })] }));
};
export default AssetClassComparison;
