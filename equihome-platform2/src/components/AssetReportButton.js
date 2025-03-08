import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const AssetReportButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: "fixed bottom-4 left-4 z-50", children: [isOpen && (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 mb-4 w-96", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Sample Asset Report" }), _jsx("button", { onClick: () => setIsOpen(false), className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("p", { className: "text-gray-600 mb-4", children: "View our comprehensive asset performance report detailing portfolio metrics, market analysis, and investment insights." }), _jsx(Link, { to: "/asset-report", className: "flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", onClick: () => setIsOpen(false), children: "View Report" })] })), _jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", children: [_jsx(FileText, { className: "h-5 w-5 text-green-500" }), _jsx("span", { className: "font-medium", children: "Sample Asset Report" })] })] }));
};
export default AssetReportButton;
