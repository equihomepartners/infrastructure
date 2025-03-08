import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mermaid } from '../../Mermaid';
const InfrastructureView = () => {
    const systemArchitectureFlow = `
    flowchart LR
      subgraph RealTime ["5-Minute Decision Engine"]
        PropTrack[PropTrack AVM]:::source
        Process[Real-time Processing]:::process
        Decision[Instant Decisions]:::process
      end

      subgraph Security ["Bank-Level Security"]
        Encrypt[256-bit Encryption]:::security
        Auth[Multi-factor Auth]:::security
        Audit[Real-time Audit]:::security
      end

      subgraph Reliability ["Enterprise Reliability"]
        HA[99.99% Uptime]:::reliability
        DR[Disaster Recovery]:::reliability
        Backup[Real-time Backup]:::reliability
      end

      RealTime --> Security
      Security --> Reliability
      Reliability -.-> RealTime

      classDef source fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef process fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
      classDef security fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
      classDef reliability fill:#fee2e2,stroke:#dc2626,stroke-width:2px
  `;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Enterprise Infrastructure" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Bank-grade infrastructure enabling 5-minute decisions with institutional-level security and 99.99% uptime." }), _jsx(Mermaid, { chart: systemArchitectureFlow })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-blue-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-blue-900 mb-4", children: "5-Minute Decisions" }), _jsxs("ul", { className: "space-y-2 text-blue-800", children: [_jsx("li", { children: "\u2022 Real-time PropTrack AVM" }), _jsx("li", { children: "\u2022 Instant processing" }), _jsx("li", { children: "\u2022 Automated decisions" })] })] }), _jsxs("div", { className: "bg-green-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-green-900 mb-4", children: "Bank-Level Security" }), _jsxs("ul", { className: "space-y-2 text-green-800", children: [_jsx("li", { children: "\u2022 256-bit encryption" }), _jsx("li", { children: "\u2022 Multi-factor auth" }), _jsx("li", { children: "\u2022 Real-time monitoring" })] })] }), _jsxs("div", { className: "bg-red-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-red-900 mb-4", children: "Enterprise Reliability" }), _jsxs("ul", { className: "space-y-2 text-red-800", children: [_jsx("li", { children: "\u2022 99.99% uptime" }), _jsx("li", { children: "\u2022 Real-time backups" }), _jsx("li", { children: "\u2022 Disaster recovery" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Real-World Impact" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-medium text-gray-900 mb-2", children: "Instant Processing" }), _jsx("p", { className: "text-gray-600", children: "Processes PropTrack AVM data and makes decisions in under 5 minutes, replacing traditional 30-day approval cycles." })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-gray-900 mb-2", children: "Enterprise Security" }), _jsx("p", { className: "text-gray-600", children: "Bank-grade security and compliance ensures institutional-level protection for all transactions and data." })] })] })] })] }));
};
export default InfrastructureView;
