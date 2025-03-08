export const formatNumber = {
  percentage: (value: number) => Math.round(value).toString() + '%',
  decimal: (value: number) => value.toFixed(1) + '%',
  currency: (value: number) => '$' + Math.round(value).toLocaleString(),
  compact: (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toString();
  },
  score: (value: number) => Math.round(value),
  shortPercentage: (value: number) => Math.round(value) + '%',
  time: (minutes: number) => minutes.toFixed(1) + 'm',
  ratio: (value: number) => value.toFixed(2)
}; 