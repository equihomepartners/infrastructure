import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, AlertTriangle } from 'lucide-react';
const ConfidentialityScreen = () => {
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Check if user has already accepted in this session
        const hasAccepted = sessionStorage.getItem('confidentialityAccepted');
        if (hasAccepted === 'true') {
            navigate('/welcome');
        }
    }, [navigate]);
    const handleContinue = () => {
        if (accepted) {
            // Store acceptance in session storage
            sessionStorage.setItem('confidentialityAccepted', 'true');
            navigate('/welcome');
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4", children: _jsxs("div", { className: "max-w-2xl w-full bg-white rounded-lg shadow-xl p-8", children: [_jsx("div", { className: "flex items-center justify-center mb-6", children: _jsx(Lock, { className: "h-12 w-12 text-indigo-600" }) }), _jsx("h1", { className: "text-3xl font-bold text-center text-gray-900 mb-8", children: "Confidential Information" }), _jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8", children: _jsxs("div", { className: "flex items-start", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-400 mt-0.5" }), _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-yellow-700", children: "This demo platform is strictly private and confidential, available exclusively to users who have been explicitly invited by Equihome Partners." }) })] }) }), _jsx("div", { className: "space-y-6 mb-8", children: _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Shield, { className: "h-6 w-6 text-indigo-600" }) }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Confidentiality Notice" }), _jsx("p", { className: "mt-2 text-gray-600", children: "By proceeding, you acknowledge that:" }), _jsxs("ul", { className: "mt-2 text-gray-600 list-disc list-inside space-y-1", children: [_jsx("li", { children: "You have been explicitly invited by Equihome Partners to access this platform" }), _jsx("li", { children: "All information presented is confidential and proprietary" }), _jsx("li", { children: "The data shown is for demonstration purposes only" }), _jsx("li", { children: "Sharing access or information from this platform is strictly prohibited" })] })] })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "accept", type: "checkbox", checked: accepted, onChange: (e) => setAccepted(e.target.checked), className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "accept", className: "ml-2 block text-sm text-gray-900", children: "I acknowledge that I have been invited by Equihome Partners and agree to maintain confidentiality" })] }), _jsx("button", { onClick: handleContinue, disabled: !accepted, className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed", children: "Continue to Platform" })] })] }) }));
};
export default ConfidentialityScreen;
