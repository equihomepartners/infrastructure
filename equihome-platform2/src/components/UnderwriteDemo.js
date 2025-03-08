import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Brain, Calculator, LineChart, AlertTriangle } from 'lucide-react';
import UnderwriteForm from './underwrite/UnderwriteForm';
import UnderwriteResults from './underwrite/UnderwriteResults';
import { analyzeLoanApplication } from '../services/mockAnalysis';
const presetScenarios = [
    {
        title: "Downsizer in Double Bay",
        description: "Empty nesters looking to unlock equity in their family home while maintaining their lifestyle in Sydney's Eastern Suburbs.",
        data: {
            borrowerName: "Richard & Margaret Wilson",
            annualIncome: 380000,
            employmentStatus: "self-employed",
            propertyAddress: "28 William Street, Double Bay",
            propertyType: "house",
            currentValue: 4200000,
            mortgageBalance: 850000,
            loanAmount: 600000,
            loanPurpose: "investment",
            loanTerm: 10,
            forecastedGrowth: 8.2
        }
    },
    {
        title: "Young Family in Manly",
        description: "Professional couple seeking to renovate their beachside property to accommodate their growing family.",
        data: {
            borrowerName: "Alex & Sophie Taylor",
            annualIncome: 420000,
            employmentStatus: "employed",
            propertyAddress: "15 Bower Street, Manly",
            propertyType: "house",
            currentValue: 2850000,
            mortgageBalance: 1200000,
            loanAmount: 450000,
            loanPurpose: "renovation",
            loanTerm: 7,
            forecastedGrowth: 7.8
        }
    },
    {
        title: "Professional in Kirribilli",
        description: "Senior executive looking to reduce mortgage payments on their harbourside apartment to focus on investment opportunities.",
        data: {
            borrowerName: "Victoria Chang",
            annualIncome: 290000,
            employmentStatus: "employed",
            propertyAddress: "42 Upper Pitt Street, Kirribilli",
            propertyType: "apartment",
            currentValue: 1950000,
            mortgageBalance: 750000,
            loanAmount: 350000,
            loanPurpose: "refinance",
            loanTerm: 5,
            forecastedGrowth: 6.8
        }
    }
];
const UnderwriteDemo = () => {
    const [decision, setDecision] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedScenario, setSelectedScenario] = useState(null);
    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await analyzeLoanApplication(data);
            setDecision(result);
        }
        catch (error) {
            console.error('Error analyzing loan:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleScenarioSelect = (scenarioData) => {
        setSelectedScenario(scenarioData);
        handleSubmit(scenarioData);
    };
    return (_jsxs("div", { className: "space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "flex items-center justify-center space-x-3 mb-4", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "AI Underwriting Demo" }), _jsx("span", { className: "text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-mono", children: "alpha" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Experience our AI-driven underwriting process in action" })] }), _jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8", children: _jsxs("div", { className: "flex", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 flex-shrink-0" }), _jsxs("div", { className: "ml-4", children: [_jsx("h3", { className: "text-lg font-medium text-yellow-800", children: "Demo Environment Notice" }), _jsx("p", { className: "mt-2 text-yellow-700", children: "This demo uses simulated data to showcase initial capabilities. The production version will include:" }), _jsxs("ul", { className: "mt-2 space-y-1 text-sm text-yellow-600", children: [_jsx("li", { children: "\u2022 Property-specific data from PropTrack and CoreLogic" }), _jsx("li", { children: "\u2022 Real-time AVM reports and market analysis" }), _jsx("li", { children: "\u2022 Comprehensive suburb-level economic indicators" }), _jsx("li", { children: "\u2022 Machine learning models trained on actual market data" }), _jsx("li", { children: "\u2022 Integration with property condition reports and comparable sales" })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [_jsxs("div", { className: "flex items-center text-blue-600 mb-4", children: [_jsx(Brain, { className: "h-6 w-6 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "AI Analysis" })] }), _jsx("p", { className: "text-gray-600 text-sm", children: "Our AI system processes multiple data points to assess risk and calculate optimal loan terms" })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [_jsxs("div", { className: "flex items-center text-blue-600 mb-4", children: [_jsx(Calculator, { className: "h-6 w-6 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Return Modeling" })] }), _jsx("p", { className: "text-gray-600 text-sm", children: "Sophisticated financial modeling to project returns and optimize deal structure" })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [_jsxs("div", { className: "flex items-center text-blue-600 mb-4", children: [_jsx(LineChart, { className: "h-6 w-6 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Risk Assessment" })] }), _jsx("p", { className: "text-gray-600 text-sm", children: "Comprehensive risk analysis considering multiple factors and market conditions" })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6 mb-8", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Example Scenarios" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: presetScenarios.map((scenario, index) => (_jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", children: scenario.title }), _jsx("p", { className: "text-gray-600 mb-4", children: scenario.description }), _jsx("button", { onClick: () => handleScenarioSelect(scenario.data), className: "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors", children: "Analyze This Scenario" })] }, index))) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { className: "space-y-6", children: _jsx(UnderwriteForm, { onSubmit: handleSubmit, loading: loading, initialValues: selectedScenario }) }), _jsx("div", { className: "space-y-6", children: decision && _jsx(UnderwriteResults, { decision: decision }) })] })] }));
};
export default UnderwriteDemo;
