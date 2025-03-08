import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HelpCircle, X, Mail } from 'lucide-react';
const HelpButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: "fixed bottom-4 right-4 z-50", children: [isOpen && (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 mb-4 w-80", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Need Help?" }), _jsx("button", { onClick: () => setIsOpen(false), className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("p", { className: "text-gray-600 mb-4", children: "Have questions about our platform? We're here to help! Contact our team for assistance." }), _jsxs("a", { href: "mailto:sujay@equihome.com.au", className: "flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", children: [_jsx(Mail, { className: "h-4 w-4 mr-2" }), "Email Support"] })] })), _jsx("button", { onClick: () => setIsOpen(!isOpen), className: `flex items-center justify-center p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all ${isOpen ? 'rotate-180' : ''}`, children: _jsx(HelpCircle, { className: "h-6 w-6" }) })] }));
};
export default HelpButton;
