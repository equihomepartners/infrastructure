import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Shield, Lock, Key, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { Line } from 'react-chartjs-2';
const SecurityView = () => {
    // Security metrics over time
    const securityMetricsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Threat Detection Rate',
                data: [99.2, 99.4, 99.6, 99.7, 99.8, 99.9],
                borderColor: '#3b82f6',
                tension: 0.4
            },
            {
                label: 'Response Time (ms)',
                data: [42, 38, 35, 32, 30, 28],
                borderColor: '#10b981',
                tension: 0.4
            }
        ]
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Security Infrastructure" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [_jsxs("h4", { className: "flex items-center text-blue-900 font-medium mb-3", children: [_jsx(Shield, { className: "h-5 w-5 mr-2" }), "Threat Protection"] }), _jsxs("ul", { className: "space-y-2 text-blue-800 text-sm", children: [_jsx("li", { children: "\u2022 Advanced DDoS mitigation" }), _jsx("li", { children: "\u2022 Real-time threat detection" }), _jsx("li", { children: "\u2022 AI-powered security" }), _jsx("li", { children: "\u2022 24/7 monitoring" })] })] }), _jsxs("div", { className: "bg-green-50 rounded-lg p-4", children: [_jsxs("h4", { className: "flex items-center text-green-900 font-medium mb-3", children: [_jsx(Lock, { className: "h-5 w-5 mr-2" }), "Data Security"] }), _jsxs("ul", { className: "space-y-2 text-green-800 text-sm", children: [_jsx("li", { children: "\u2022 End-to-end encryption" }), _jsx("li", { children: "\u2022 Secure key management" }), _jsx("li", { children: "\u2022 Data masking" }), _jsx("li", { children: "\u2022 Regular audits" })] })] }), _jsxs("div", { className: "bg-purple-50 rounded-lg p-4", children: [_jsxs("h4", { className: "flex items-center text-purple-900 font-medium mb-3", children: [_jsx(Key, { className: "h-5 w-5 mr-2" }), "Access Control"] }), _jsxs("ul", { className: "space-y-2 text-purple-800 text-sm", children: [_jsx("li", { children: "\u2022 Role-based access" }), _jsx("li", { children: "\u2022 MFA enabled" }), _jsx("li", { children: "\u2022 Activity logging" }), _jsx("li", { children: "\u2022 IP whitelisting" })] })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
                    { label: 'Uptime', value: '99.99%', icon: CheckCircle, color: 'green' },
                    { label: 'Threats Blocked', value: '100k+', icon: Shield, color: 'blue' },
                    { label: 'Response Time', value: '28ms', icon: AlertTriangle, color: 'yellow' },
                    { label: 'Active Users', value: '2.4k', icon: Users, color: 'purple' }
                ].map((metric, index) => (_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: metric.label }), _jsx("p", { className: "text-2xl font-semibold mt-1", children: metric.value })] }), _jsx(metric.icon, { className: `h-8 w-8 text-${metric.color}-600` })] }) }, index))) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Security Performance" }), _jsx("div", { className: "h-80", children: _jsx(Line, { data: securityMetricsData, options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        min: 0,
                                        max: 100
                                    }
                                }
                            } }) })] })] }));
};
export default SecurityView;
