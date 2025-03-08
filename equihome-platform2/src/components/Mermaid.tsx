import React, { FC, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

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

export const Mermaid: FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.contentLoaded();
      containerRef.current.innerHTML = '<div class="mermaid">' + chart + '</div>';
      try {
        mermaid.init(undefined, '.mermaid');
      } catch (error) {
        console.error('Mermaid initialization failed:', error);
      }
    }
  }, [chart]);

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
          <ZoomIn className="h-4 w-4" />
        </button>
        <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
          <ZoomOut className="h-4 w-4" />
        </button>
        <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <div ref={containerRef} className="overflow-auto mermaid-container" />
    </div>
  );
};