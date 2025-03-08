import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TrendingUp, Shield, Building, Percent } from 'lucide-react';
const FundParameters = () => {
    const [parameters, setParameters] = useState([
        {
            id: 'target-irr',
            name: 'Target IRR',
            value: 18,
            min: 10,
            max: 30,
            step: 0.5,
            unit: '%',
            category: 'returns'
        },
        {
            id: 'max-ltv',
            name: 'Maximum LTV',
            value: 75,
            min: 50,
            max: 85,
            step: 5,
            unit: '%',
            category: 'risk'
        },
        {
            id: 'min-property-value',
            name: 'Minimum Property Value',
            value: 1000000,
            min: 500000,
            max: 5000000,
            step: 100000,
            unit: '$',
            category: 'property'
        },
        {
            id: 'max-exposure',
            name: 'Maximum Suburb Exposure',
            value: 25,
            min: 10,
            max: 40,
            step: 5,
            unit: '%',
            category: 'risk'
        }
    ]);
    const [zoneAllocation, setZoneAllocation] = useState({
        green: 90,
        orange: 10,
        red: 0
    });
    const handleParameterChange = (id, value) => {
        setParameters(parameters.map(param => param.id === id ? { ...param, value } : param));
    };
    const handleZoneChange = (zone, value) => {
        const newAllocation = { ...zoneAllocation };
        const oldValue = newAllocation[zone];
        newAllocation[zone] = value;
        // Adjust other zones proportionally
        const remaining = 100 - value;
        const otherZones = Object.keys(newAllocation).filter(k => k !== zone);
        const oldSum = otherZones.reduce((sum, key) => sum + newAllocation[key], 0);
        if (oldSum > 0) {
            otherZones.forEach(key => {
                newAllocation[key] = Math.round((newAllocation[key] / oldSum) * remaining);
            });
        }
        // Ensure total is 100%
        const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
        if (total !== 100) {
            const diff = 100 - total;
            const lastZone = otherZones[otherZones.length - 1];
            newAllocation[lastZone] += diff;
        }
        setZoneAllocation(newAllocation);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: parameters.map(param => (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center", children: [param.category === 'returns' && _jsx(TrendingUp, { className: "h-5 w-5 text-blue-500 mr-2" }), param.category === 'risk' && _jsx(Shield, { className: "h-5 w-5 text-red-500 mr-2" }), param.category === 'property' && _jsx(Building, { className: "h-5 w-5 text-green-500 mr-2" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: param.name })] }), _jsx("span", { className: "text-lg font-bold text-indigo-600", children: param.unit === '$'
                                        ? `$${param.value.toLocaleString()}`
                                        : `${param.value}${param.unit}` })] }), _jsx("input", { type: "range", min: param.min, max: param.max, step: param.step, value: param.value, onChange: (e) => handleParameterChange(param.id, Number(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" }), _jsxs("div", { className: "flex justify-between mt-2 text-sm text-gray-500", children: [_jsx("span", { children: param.unit === '$'
                                        ? `$${param.min.toLocaleString()}`
                                        : `${param.min}${param.unit}` }), _jsx("span", { children: param.unit === '$'
                                        ? `$${param.max.toLocaleString()}`
                                        : `${param.max}${param.unit}` })] })] }, param.id))) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Percent, { className: "h-5 w-5 text-indigo-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Zone Allocation Targets" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("label", { className: "text-sm font-medium text-green-700", children: "Green Zone Target" }), _jsxs("span", { className: "text-sm text-green-700", children: [zoneAllocation.green, "%"] })] }), _jsx("input", { type: "range", min: "0", max: "100", value: zoneAllocation.green, onChange: (e) => handleZoneChange('green', parseInt(e.target.value)), className: "w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("label", { className: "text-sm font-medium text-yellow-700", children: "Orange Zone Target" }), _jsxs("span", { className: "text-sm text-yellow-700", children: [zoneAllocation.orange, "%"] })] }), _jsx("input", { type: "range", min: "0", max: "100", value: zoneAllocation.orange, onChange: (e) => handleZoneChange('orange', parseInt(e.target.value)), className: "w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("label", { className: "text-sm font-medium text-red-700", children: "Red Zone Target" }), _jsxs("span", { className: "text-sm text-red-700", children: [zoneAllocation.red, "%"] })] }), _jsx("input", { type: "range", min: "0", max: "100", value: zoneAllocation.red, onChange: (e) => handleZoneChange('red', parseInt(e.target.value)), className: "w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg mt-4", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Current Allocation" }), _jsxs("div", { className: "h-4 rounded-full overflow-hidden flex", children: [_jsx("div", { className: "bg-green-500 h-full transition-all duration-300", style: { width: `${zoneAllocation.green}%` } }), _jsx("div", { className: "bg-yellow-500 h-full transition-all duration-300", style: { width: `${zoneAllocation.orange}%` } }), _jsx("div", { className: "bg-red-500 h-full transition-all duration-300", style: { width: `${zoneAllocation.red}%` } })] })] })] })] })] }));
};
export default FundParameters;
