import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Mermaid } from '../../Mermaid';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);
const AIArchitectureView = () => {
    const coreAIFlow = `
    flowchart LR
      subgraph Strategy ["Investment Strategy"]
        Markets[Target Markets]:::strategy
        Capital[Capital Allocation]:::strategy
        Limits[Investment Limits]:::strategy
      end

      subgraph Rules ["Business Rules"]
        Risk[Risk Framework]:::rules
        Returns[Return Targets]:::rules
        Exposure[Exposure Limits]:::rules
      end

      subgraph Actions ["Strategic Actions"]
        Approve[Deal Approvals]:::action
        Adjust[Strategy Adjustments]:::action
        Balance[Portfolio Balance]:::action
      end

      Strategy --> Rules
      Rules --> Actions
      Actions -.-> Strategy

      classDef strategy fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef rules fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
      classDef action fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
  `;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Strategic AI System" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Our AI strategist makes high-level investment decisions, sets business rules, and manages portfolio strategy. It works like an automated investment committee, ensuring our fund stays aligned with its objectives." }), _jsx(Mermaid, { chart: coreAIFlow })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-blue-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Investment Strategy" }), _jsxs("ul", { className: "space-y-2 text-blue-800", children: [_jsx("li", { children: "\u2022 Sets target markets" }), _jsx("li", { children: "\u2022 Allocates capital" }), _jsx("li", { children: "\u2022 Defines investment criteria" }), _jsx("li", { children: "\u2022 Manages fund strategy" })] })] }), _jsxs("div", { className: "bg-indigo-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-indigo-900 mb-4", children: "Business Rules" }), _jsxs("ul", { className: "space-y-2 text-indigo-800", children: [_jsx("li", { children: "\u2022 Risk framework" }), _jsx("li", { children: "\u2022 Return targets" }), _jsx("li", { children: "\u2022 Exposure limits" }), _jsx("li", { children: "\u2022 Investment criteria" })] })] }), _jsxs("div", { className: "bg-green-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-green-900 mb-4", children: "Strategic Actions" }), _jsxs("ul", { className: "space-y-2 text-green-800", children: [_jsx("li", { children: "\u2022 Deal approvals" }), _jsx("li", { children: "\u2022 Strategy adjustments" }), _jsx("li", { children: "\u2022 Portfolio balancing" }), _jsx("li", { children: "\u2022 Risk management" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Strategic Decision Process" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-medium text-gray-900 mb-2", children: "Investment Committee AI" }), _jsx("p", { className: "text-gray-600", children: "Acts as an automated investment committee, making strategic decisions about where to invest, how much to invest, and when to adjust strategy based on market conditions and fund performance." })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-gray-900 mb-2", children: "Dynamic Strategy" }), _jsx("p", { className: "text-gray-600", children: "Continuously monitors fund performance and market conditions to make strategic adjustments, ensuring the portfolio stays optimized and aligned with fund objectives." })] })] })] })] }));
};
export default AIArchitectureView;
