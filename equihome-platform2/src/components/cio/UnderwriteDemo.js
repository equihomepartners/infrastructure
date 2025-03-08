import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Brain, Calculator, LineChart } from 'lucide-react';
import UnderwriteForm from './underwrite/UnderwriteForm';
import UnderwriteResults from './underwrite/UnderwriteResults';
import { analyzeLoanApplication } from '../../services/openai';
const UnderwriteDemo = () => {
    const [decision, setDecision] = useState(null);
    const [loading, setLoading] = useState(false);
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "AI Underwriting System Demo" }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Experience our sophisticated AI-driven underwriting process. Input property and borrower details to see how our system analyzes and structures deals." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center text-blue-600 mb-4", children: [_jsx(Brain, { className: "h-6 w-6 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "AI Analysis" })] }), _jsx("p", { className: "text-gray-600 text-sm", children: "Our AI system processes multiple data points to assess risk and calculate optimal loan terms" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center text-green-600 mb-4", children: [_jsx(Calculator, { className: "h-6 w-6 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Return Modeling" })] }), _jsx("p", { className: "text-gray-600 text-sm", children: "Sophisticated financial modeling to project returns and optimize deal structure" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center text-purple-600 mb-4", children: [_jsx(LineChart, { className: "h-6 w-6 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Risk Assessment" })] }), _jsx("p", { className: "text-gray-600 text-sm", children: "Comprehensive risk analysis considering multiple factors and market conditions" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { className: "space-y-6", children: _jsx(UnderwriteForm, { onSubmit: handleSubmit, loading: loading }) }), _jsx("div", { className: "space-y-6", children: decision && _jsx(UnderwriteResults, { decision: decision }) })] })] }));
};
export default UnderwriteDemo;
