import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { AlertTriangle, TrendingUp, Clock, Percent } from 'lucide-react';
const ScenarioComparison = ({ modelInputs }) => {
    // Growth rate scenarios
    const growthScenarios = [
        { name: 'Armageddon', rate: -5 },
        { name: 'Conservative', rate: Number(modelInputs.growthRate - 2) },
        { name: 'Base Case', rate: Number(modelInputs.growthRate) },
        { name: 'Optimistic', rate: Number(modelInputs.growthRate + 2) },
        { name: 'Bull Market', rate: 10 }
    ];
    // Exit timing scenarios
    const exitScenarios = [
        { name: 'Early Exit', year: Math.max(2, modelInputs.desiredExitYear - 2) },
        { name: 'Target Exit', year: modelInputs.desiredExitYear },
        { name: 'Late Exit', year: Math.min(10, modelInputs.desiredExitYear + 2) }
    ];
    // Calculate IRR and LTV for a given scenario
    const calculateScenarioMetrics = (growthRate, exitYear) => {
        const propertyValue = modelInputs.propertyValue * Math.pow(1 + growthRate / 100, exitYear);
        const appreciation = propertyValue - modelInputs.propertyValue;
        const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
        const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, exitYear) - 1);
        const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
        const totalReturn = accruedInterest + appreciationShare + upfrontFee;
        // Calculate Combined LTV
        const totalDebt = modelInputs.existingMortgage + modelInputs.loanAmount;
        const combinedLTV = (totalDebt / propertyValue) * 100;
        // Calculate homeowner equity
        const equity = propertyValue - totalDebt;
        const equityPercentage = (equity / propertyValue) * 100;
        // Calculate IRR
        const irr = (Math.pow((totalReturn + modelInputs.loanAmount) / modelInputs.loanAmount, 1 / exitYear) - 1) * 100;
        return {
            irr,
            combinedLTV,
            equityPercentage,
            propertyValue,
            equity
        };
    };
    // Growth Rate Impact Data
    const growthData = {
        labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
        datasets: growthScenarios.map(scenario => ({
            label: scenario.name,
            data: Array.from({ length: 10 }, (_, i) => calculateScenarioMetrics(scenario.rate, i + 1).irr),
            borderColor: scenario.name === 'Armageddon' ? '#991B1B' :
                scenario.name === 'Conservative' ? '#EF4444' :
                    scenario.name === 'Base Case' ? '#3B82F6' :
                        scenario.name === 'Optimistic' ? '#10B981' :
                            '#8B5CF6',
            backgroundColor: 'transparent',
            tension: 0.4
        }))
    };
    // Combined LTV Impact Data
    const ltvData = {
        labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
        datasets: growthScenarios.map(scenario => ({
            label: scenario.name,
            data: Array.from({ length: 10 }, (_, i) => calculateScenarioMetrics(scenario.rate, i + 1).combinedLTV),
            borderColor: scenario.name === 'Armageddon' ? '#991B1B' :
                scenario.name === 'Conservative' ? '#EF4444' :
                    scenario.name === 'Base Case' ? '#3B82F6' :
                        scenario.name === 'Optimistic' ? '#10B981' :
                            '#8B5CF6',
            backgroundColor: 'transparent',
            tension: 0.4
        }))
    };
    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            annotation: {
                annotations: {
                    exitLine: {
                        type: 'line',
                        xMin: modelInputs.desiredExitYear - 1,
                        xMax: modelInputs.desiredExitYear - 1,
                        borderColor: 'rgba(239, 68, 68, 0.5)',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: {
                            display: true,
                            content: `Target Exit (Year ${modelInputs.desiredExitYear})`,
                            position: 'start'
                        }
                    }
                }
            }
        }
    };
    // Calculate scenario matrix
    const scenarioMatrix = growthScenarios.map(growth => {
        const metrics = calculateScenarioMetrics(growth.rate, modelInputs.desiredExitYear);
        return {
            growthScenario: growth.name,
            rate: Number(growth.rate),
            propertyValue: metrics.propertyValue,
            combinedLTV: metrics.combinedLTV,
            equityPercentage: metrics.equityPercentage,
            equity: metrics.equity,
            irr: metrics.irr
        };
    });
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg", children: _jsxs("div", { className: "flex", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 flex-shrink-0" }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-lg font-medium text-yellow-800", children: "Scenario Analysis" }), _jsxs("div", { className: "mt-2 text-yellow-700", children: [_jsx("p", { children: "This analysis shows how different growth scenarios affect:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 mt-2", children: [_jsx("li", { children: "Your IRR (investment return)" }), _jsx("li", { children: "Combined LTV ratio over time" }), _jsx("li", { children: "Homeowner's equity position" }), _jsx("li", { children: "Property value appreciation" })] })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Growth Rate Impact on IRR" })] }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: growthData, options: {
                                        ...commonOptions,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'IRR (%)'
                                                },
                                                ticks: {
                                                    callback: (value) => `${value.toFixed(1)}%`
                                                }
                                            }
                                        }
                                    } }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Percent, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Impact on Combined LTV" })] }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: ltvData, options: {
                                        ...commonOptions,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Combined LTV (%)'
                                                },
                                                ticks: {
                                                    callback: (value) => `${value.toFixed(1)}%`
                                                }
                                            }
                                        }
                                    } }) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsxs("h3", { className: "text-lg font-semibold", children: ["Scenario Comparison at Exit (Year ", modelInputs.desiredExitYear, ")"] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Growth Scenario" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Property Value" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Combined LTV" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Equity" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Equity %" }), _jsx("th", { className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "IRR" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: scenarioMatrix.map((scenario) => (_jsxs("tr", { children: [_jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: [scenario.growthScenario, " (", scenario.rate.toFixed(1), "%)"] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["$", Math.round(scenario.propertyValue).toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [scenario.combinedLTV.toFixed(1), "%"] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: ["$", Math.round(scenario.equity).toLocaleString()] }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [scenario.equityPercentage.toFixed(1), "%"] }), _jsxs("td", { className: `px-6 py-4 whitespace-nowrap text-sm font-medium ${scenario.irr >= modelInputs.interestRate + 5
                                                    ? 'text-green-600'
                                                    : scenario.irr >= modelInputs.interestRate
                                                        ? 'text-blue-600'
                                                        : 'text-red-600'}`, children: [scenario.irr.toFixed(2), "%"] })] }, scenario.growthScenario))) })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Growth Rate Scenarios" }), _jsx("div", { className: "space-y-4", children: growthScenarios.map(scenario => {
                                    const metrics = calculateScenarioMetrics(scenario.rate, modelInputs.desiredExitYear);
                                    return (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: scenario.name }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mt-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-gray-500", children: "Growth Rate" }), _jsxs("div", { className: "text-base font-semibold", children: [Number(scenario.rate).toFixed(1), "%"] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-gray-500", children: "Final LTV" }), _jsxs("div", { className: "text-base font-semibold", children: [metrics.combinedLTV.toFixed(1), "%"] })] })] })] }, scenario.name));
                                }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Exit Timing Scenarios" }), _jsx("div", { className: "space-y-4", children: exitScenarios.map(scenario => {
                                    const metrics = calculateScenarioMetrics(modelInputs.growthRate, scenario.year);
                                    return (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: scenario.name }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mt-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-gray-500", children: "Exit Year" }), _jsxs("div", { className: "text-base font-semibold", children: ["Year ", scenario.year] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-gray-500", children: "Equity %" }), _jsxs("div", { className: "text-base font-semibold", children: [metrics.equityPercentage.toFixed(1), "%"] })] })] })] }, scenario.name));
                                }) })] })] })] }));
};
export default ScenarioComparison;
