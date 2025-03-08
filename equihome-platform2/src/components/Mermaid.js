import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import mermaid from 'mermaid';
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    logLevel: 'error',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    }
});
export const Mermaid = ({ chart }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            mermaid.contentLoaded();
            containerRef.current.innerHTML = '<div class="mermaid">' + chart + '</div>';
            try {
                mermaid.init(undefined, '.mermaid');
            }
            catch (error) {
                console.error('Mermaid initialization failed:', error);
            }
        }
    }, [chart]);
    return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "absolute top-2 right-2 flex gap-2 z-10", children: [_jsx("button", { className: "p-1 rounded bg-gray-100 hover:bg-gray-200", children: _jsx(ZoomIn, { className: "h-4 w-4" }) }), _jsx("button", { className: "p-1 rounded bg-gray-100 hover:bg-gray-200", children: _jsx(ZoomOut, { className: "h-4 w-4" }) }), _jsx("button", { className: "p-1 rounded bg-gray-100 hover:bg-gray-200", children: _jsx(RotateCcw, { className: "h-4 w-4" }) })] }), _jsx("div", { ref: containerRef, className: "overflow-auto mermaid-container" })] }));
};
