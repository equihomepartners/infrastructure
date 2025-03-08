import { ReactNode } from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface TabProps extends BaseComponentProps {
  value: string;
  title: string;
}

export interface AnalysisProps {
  dealId?: string;
  propertyValue?: number;
  loanAmount?: number;
}

export interface ChartProps {
  data: any;
  options?: any;
  height?: number;
  width?: number;
}

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
  }>;
} 