// Format number with commas
export const formatNumber = (value: number | string): string => {
  if (typeof value === 'string') value = parseFloat(value);
  return value.toLocaleString('en-US');
};

// Parse formatted string back to number
export const parseFormattedNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, ''));
};

// Handle input change with formatting
export const handleFormattedNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: number) => void
) => {
  const rawValue = e.target.value.replace(/,/g, '');
  const numericValue = parseFloat(rawValue);
  
  if (!isNaN(numericValue)) {
    onChange(numericValue);
  }
};

// Format currency
export const formatCurrency = (value: number): string => {
  return `$${formatNumber(value)}`;
};