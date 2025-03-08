import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from 'lucide-react';
const ConfigCheck = () => {
    const missingEnvVars = [];
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
        missingEnvVars.push('VITE_OPENAI_API_KEY');
    }
    if (!import.meta.env.VITE_OPENAI_ASSISTANT_ID) {
        missingEnvVars.push('VITE_OPENAI_ASSISTANT_ID');
    }
    if (missingEnvVars.length === 0) {
        return null;
    }
    return (_jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8", children: _jsxs("div", { className: "flex items-start", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 mt-0.5" }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-yellow-800", children: "Configuration Warning" }), _jsxs("div", { className: "mt-2 text-sm text-yellow-700", children: [_jsx("p", { children: "The following environment variables are missing:" }), _jsx("ul", { className: "list-disc list-inside mt-1", children: missingEnvVars.map(variable => (_jsx("li", { children: variable }, variable))) }), _jsx("p", { className: "mt-2", children: "Please add these to your .env file to enable full functionality." })] })] })] }) }));
};
export default ConfigCheck;
