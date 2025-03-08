import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Brain, GitBranch } from 'lucide-react';
import { Mermaid } from '../../Mermaid';
const AIMLComparisonView = () => {
    const comparisonFlow = `
    flowchart LR
      subgraph AI ["AI Architecture"]
        Strategy[Strategic Decision Making]:::ai
        Rules[Business Rules Engine]:::ai
        Logic[Complex Logic Processing]:::ai
        Executive[Executive Decisions]:::ai
      end

      subgraph ML ["ML Pipeline"]
        Data[Data Processing]:::ml
        Models[Model Training]:::ml
        Predictions[Numerical Predictions]:::ml
        Performance[Performance Metrics]:::ml
      end

      AI --> ML
      ML --> AI

      classDef ai fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef ml fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
  `;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "AI vs ML Architecture" }), _jsx(Mermaid, { chart: comparisonFlow })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-blue-50 rounded-lg p-6", children: [_jsxs("h4", { className: "flex items-center text-lg font-semibold text-blue-900 mb-4", children: [_jsx(Brain, { className: "h-5 w-5 mr-2" }), "AI Architecture"] }), _jsxs("ul", { className: "space-y-3 text-blue-800", children: [_jsx("li", { children: "\u2022 Strategic decision-making system" }), _jsx("li", { children: "\u2022 Complex business logic processing" }), _jsx("li", { children: "\u2022 Market understanding and analysis" }), _jsx("li", { children: "\u2022 Executive-level recommendations" }), _jsx("li", { children: "\u2022 Portfolio strategy optimization" })] })] }), _jsxs("div", { className: "bg-green-50 rounded-lg p-6", children: [_jsxs("h4", { className: "flex items-center text-lg font-semibold text-green-900 mb-4", children: [_jsx(GitBranch, { className: "h-5 w-5 mr-2" }), "ML Pipeline"] }), _jsxs("ul", { className: "space-y-3 text-green-800", children: [_jsx("li", { children: "\u2022 Technical data processing" }), _jsx("li", { children: "\u2022 Model training and validation" }), _jsx("li", { children: "\u2022 Numerical predictions" }), _jsx("li", { children: "\u2022 Performance metrics tracking" }), _jsx("li", { children: "\u2022 Continuous model improvement" })] })] })] })] }));
};
export default AIMLComparisonView;
