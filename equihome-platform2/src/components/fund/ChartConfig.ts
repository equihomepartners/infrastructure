import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  Scale,
  CoreScaleOptions
} from 'chart.js';

import { chartColors } from './chartConstants';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const defaultScaleOptions = {
  y: {
    type: 'linear' as const,
    beginAtZero: true,
    grid: {
      color: chartColors.gridLines,
    },
    border: {
      display: false
    },
    ticks: {
      font: {
        size: 12
      },
      color: chartColors.textSecondary,
      callback: function(this: Scale<CoreScaleOptions>, value: number | string) {
        return `${value}%`;
      }
    }
  },
  x: {
    type: 'category' as const,
    grid: {
      display: false
    },
    border: {
      display: false
    },
    ticks: {
      font: {
        size: 12
      },
      color: chartColors.textSecondary
    }
  }
} as const;

export const commonOptions: ChartOptions<'bar' | 'line' | 'scatter'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12,
          weight: 500
        },
        color: chartColors.text
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: chartColors.text,
      bodyColor: chartColors.textSecondary,
      borderColor: chartColors.gridLines,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 4,
      bodyFont: {
        family: 'Inter, system-ui, sans-serif',
        size: 12
      },
      titleFont: {
        family: 'Inter, system-ui, sans-serif',
        size: 13,
        weight: 500
      }
    }
  },
  scales: defaultScaleOptions
} as const;