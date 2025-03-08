import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { commonOptions } from '../fund/ChartConfig';
const MarketAnalysis = () => {
    const globalComparisonData = {
        labels: ['2004', '2006', '2008', '2010', '2012', '2014', '2016', '2018', '2020', '2022'],
        datasets: [
            {
                label: 'Sydney',
                data: [1.0, 0.95, 1.1, 1.2, 1.4, 1.6, 1.8, 1.9, 2.2, 2.6],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            },
            {
                label: 'San Francisco',
                data: [1.0, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9, 2.0, 2.1],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            },
            {
                label: 'New York',
                data: [1.0, 1.1, 1.2, 1.25, 1.3, 1.4, 1.5, 1.6, 1.8, 2.0],
                borderColor: '#6B7280',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                tension: 0.4
            },
            {
                label: 'Hong Kong',
                data: [1.0, 1.4, 1.8, 2.0, 2.4, 2.8, 3.2, 3.3, 2.9, 2.7],
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4
            }
        ]
    };
    const priceData = {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Sydney Premium Suburbs',
                data: [1150000, 1220000, 1410000, 1590000, 1680000, 1750000],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            },
            {
                label: 'Melbourne Premium Suburbs',
                data: [902000, 936000, 1040000, 1120000, 1190000, 1240000],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }
        ]
    };
    return (_jsxs("section", { className: "space-y-12", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Global Market Position" }), _jsx("div", { className: "prose max-w-none mb-8", children: _jsx("p", { className: "text-gray-600 leading-relaxed", children: "Sydney's real estate market stands among the world's leading property markets, demonstrating consistent growth and resilience. With a compound annual growth rate (CAGR) of 5% over the past 20 years, Sydney's market performance rivals other global financial centers while maintaining more stable appreciation patterns." }) }), _jsx("div", { className: "h-[400px] mb-8", children: _jsx(Line, { data: globalComparisonData, options: {
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: {
                                        display: true,
                                        text: 'Global Real Estate Market Index (2004 = 1.0)',
                                        font: {
                                            size: 16,
                                            weight: 'bold'
                                        }
                                    }
                                }
                            } }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Total Dwellings" }), _jsx("div", { className: "text-2xl font-bold", children: "1,162,719" })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Median House Price" }), _jsx("div", { className: "text-2xl font-bold", children: "~$900,000" })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "20-Year CAGR" }), _jsx("div", { className: "text-2xl font-bold", children: "5.0%" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Market Overview" }), _jsx("div", { className: "prose max-w-none mb-8", children: _jsx("p", { className: "text-gray-600 leading-relaxed", children: "The Australian residential property market continues to demonstrate robust fundamentals, with Sydney leading the nation in both median house prices and growth rates. The combination of limited housing supply, strong population growth, and sustained economic performance has created an environment where property values have shown remarkable resilience and growth potential." }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Key Market Indicators" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Annual Growth Rate" }), _jsx("span", { className: "font-semibold text-green-600", children: "8.2%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Median House Price" }), _jsx("span", { className: "font-semibold", children: "$1.75M" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Rental Yield" }), _jsx("span", { className: "font-semibold", children: "3.8%" })] })] })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Market Dynamics" }), _jsxs("ul", { className: "space-y-3 text-gray-600", children: [_jsx("li", { children: "\u2022 Strong demand in premium suburbs" }), _jsx("li", { children: "\u2022 Limited housing supply" }), _jsx("li", { children: "\u2022 High rental yields in key areas" }), _jsx("li", { children: "\u2022 Growing infrastructure investment" })] })] })] }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: priceData, options: {
                                        ...commonOptions,
                                        plugins: {
                                            ...commonOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Premium Suburb Price Trends',
                                                font: {
                                                    size: 16,
                                                    weight: 'bold'
                                                }
                                            }
                                        }
                                    } }) })] })] })] }));
};
export default MarketAnalysis;
