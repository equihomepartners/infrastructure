// Format number with commas
export const formatNumber = (value) => {
    if (typeof value === 'string')
        value = parseFloat(value);
    return value.toLocaleString('en-US');
};
// Parse formatted string back to number
export const parseFormattedNumber = (value) => {
    return parseFloat(value.replace(/,/g, ''));
};
// Handle input change with formatting
export const handleFormattedNumberChange = (e, onChange) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numericValue = parseFloat(rawValue);
    if (!isNaN(numericValue)) {
        onChange(numericValue);
    }
};
// Format currency
export const formatCurrency = (value) => {
    return `$${formatNumber(value)}`;
};
