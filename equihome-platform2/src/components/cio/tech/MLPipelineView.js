import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mermaid } from '../../Mermaid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const MLPipelineView = () => {
    const mlPipelineFlow = `
    flowchart LR
      subgraph Learning ["Strategic Learning"]
        Portfolio[Portfolio Analysis]:::learning
        Market[Market Analysis]:::learning
        Risk[Risk Analysis]:::learning
      end

      subgraph Adaptation ["Strategy Adaptation"]
        Adjust[Strategy Adjustment]:::adapt
        Balance[Portfolio Balance]:::adapt
        Exposure[Risk Exposure]:::adapt
      end

      subgraph Outcomes ["Performance Tracking"]
        Returns[Return Metrics]:::outcome
        Health[Portfolio Health]:::outcome
        Growth[Fund Growth]:::outcome
      end

      Learning --> Adaptation
      Adaptation --> Outcomes
      Outcomes -.-> Learning

      classDef learning fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef adapt fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
      classDef outcome fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
  `;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "ML Learning System" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Our ML system continuously learns from portfolio performance and market conditions to optimize strategy and risk management, ensuring we maintain optimal market positioning." }), _jsx(Mermaid, { chart: mlPipelineFlow })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-blue-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Strategic Learning" }), _jsxs("ul", { className: "space-y-2 text-blue-800", children: [_jsx("li", { children: "\u2022 Portfolio performance analysis" }), _jsx("li", { children: "\u2022 Market trend detection" }), _jsx("li", { children: "\u2022 Risk pattern identification" })] })] }), _jsxs("div", { className: "bg-indigo-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-indigo-900 mb-4", children: "Strategy Adaptation" }), _jsxs("ul", { className: "space-y-2 text-indigo-800", children: [_jsx("li", { children: "\u2022 Dynamic strategy updates" }), _jsx("li", { children: "\u2022 Portfolio rebalancing" }), _jsx("li", { children: "\u2022 Risk exposure management" })] })] }), _jsxs("div", { className: "bg-green-50 rounded-lg p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-green-900 mb-4", children: "Performance Tracking" }), _jsxs("ul", { className: "space-y-2 text-green-800", children: [_jsx("li", { children: "\u2022 Return optimization" }), _jsx("li", { children: "\u2022 Portfolio health metrics" }), _jsx("li", { children: "\u2022 Growth trajectory analysis" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Real-World Impact" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-medium text-gray-900 mb-2", children: "Continuous Improvement" }), _jsx("p", { className: "text-gray-600", children: "System learns from every decision and transaction to refine its strategy and improve fund performance." })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-gray-900 mb-2", children: "Market Adaptation" }), _jsx("p", { className: "text-gray-600", children: "Automatically adjusts strategy based on changing market conditions and portfolio performance." })] })] })] })] }));
};
export default MLPipelineView;
