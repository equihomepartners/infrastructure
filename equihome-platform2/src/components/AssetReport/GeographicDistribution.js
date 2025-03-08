import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { sampleDeals } from '../../data/sampleDeals';
const GeographicDistribution = () => {
    // Calculate suburb distribution from sample deals
    const suburbDistribution = useMemo(() => {
        const distribution = sampleDeals.reduce((acc, deal) => {
            acc[deal.suburb] = (acc[deal.suburb] || 0) + deal.loanAmount;
            return acc;
        }, {});
        // Convert to array and sort by amount
        return Object.entries(distribution)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5); // Top 5 suburbs
    }, []);
    const data = {
        labels: suburbDistribution.map(([suburb]) => suburb),
        datasets: [
            {
                data: suburbDistribution.map(([, amount]) => Math.round(amount / 1000)), // Convert to millions
                backgroundColor: '#2563EB',
                borderRadius: 8,
                barThickness: 40
            }
        ]
    };
    // Calculate zone percentages
    const zoneDistribution = useMemo(() => {
        const total = sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);
        const byZone = sampleDeals.reduce((acc, deal) => {
            const zone = deal.propertyDetails.trafficLight;
            acc[zone] = (acc[zone] || 0) + deal.loanAmount;
            return acc;
        }, {});
        return {
            green: Math.round((byZone['Green'] || 0) / total * 100),
            orange: Math.round((byZone['Orange'] || 0) / total * 100),
            red: Math.round((byZone['Red'] || 0) / total * 100)
        };
    }, []);
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
                grid: {
                    display: false
                },
                ticks: {
                    callback: (value) => `$${value}mm`,
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
    return (_jsxs("div", { className: "space-y-16", children: [_jsxs("div", { className: "bg-gray-50 p-12 rounded-xl", children: [_jsxs("div", { className: "max-w-3xl mb-12", children: [_jsx("h3", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Assets are diversified across premium suburbs" }), _jsx("p", { className: "text-gray-600", children: "Geographic diversification across Sydney's premium suburbs enables Equihome to originate residential real estate option contracts without excessive risk." })] }), _jsx("div", { className: "h-[400px]", children: _jsx(Bar, { data: data, options: options }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-green-500" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Green Zone" })] }), _jsxs("div", { className: "text-3xl font-bold text-green-600 mb-2", children: [zoneDistribution.green, "%"] }), _jsx("p", { className: "text-gray-600", children: "Portfolio concentration" })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-yellow-500" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Orange Zone" })] }), _jsxs("div", { className: "text-3xl font-bold text-yellow-600 mb-2", children: [zoneDistribution.orange, "%"] }), _jsx("p", { className: "text-gray-600", children: "Portfolio concentration" })] }), _jsxs("div", { className: "bg-gray-50 p-8 rounded-xl", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-red-500" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Red Zone" })] }), _jsxs("div", { className: "text-3xl font-bold text-red-600 mb-2", children: [zoneDistribution.red, "%"] }), _jsx("p", { className: "text-gray-600", children: "Portfolio concentration" })] })] })] }));
};
export default GeographicDistribution;
