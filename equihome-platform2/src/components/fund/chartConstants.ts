export const chartColors = {
  pieColors: [
    '#1E40AF', // Deep Blue
    '#047857', // Forest Green
    '#7C3AED', // Royal Purple
    '#B91C1C', // Deep Red
    '#C2410C', // Burnt Orange
    '#0369A1', // Ocean Blue
  ],
  barColors: {
    positive: '#047857',
    negative: '#B91C1C',
  },
  lineColors: {
    primary: '#1E40AF',
    secondary: '#047857',
    tertiary: '#7C3AED',
  },
  mapColors: {
    marker: 'rgba(30, 64, 175, 0.7)',
    markerBorder: '#1E40AF',
    highlight: 'rgba(30, 64, 175, 0.9)'
  },
  background: '#F8FAFC',
  gridLines: '#E2E8F0',
  text: '#1E293B',
  textSecondary: '#64748B'
} as const; 