import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { formatNumber } from '../../lib/formatters';
const Input = forwardRef(({ className, type, formatNumber: shouldFormat, onChange, value, ...props }, ref) => {
    const handleChange = (e) => {
        if (!onChange)
            return;
        if (shouldFormat && type === 'number') {
            // Remove commas and convert to number
            const rawValue = e.target.value.replace(/,/g, '');
            const numericValue = parseFloat(rawValue);
            if (!isNaN(numericValue)) {
                onChange(numericValue);
            }
        }
        else {
            onChange(e.target.value);
        }
    };
    // Format the display value if it's a number and formatting is enabled
    const displayValue = shouldFormat && typeof value === 'number'
        ? formatNumber(value)
        : value;
    return (_jsx("input", { type: shouldFormat ? 'text' : type, className: className, ref: ref, value: displayValue, onChange: handleChange, ...props }));
});
Input.displayName = 'Input';
export default Input;
