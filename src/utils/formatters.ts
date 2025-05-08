
/**
 * Formats a number as currency
 * @param value Number to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, decimals: number = 2): string => {
  // For large numbers (billions)
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  // For millions
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  
  // For regular numbers
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : decimals,
    maximumFractionDigits: value < 1 ? 6 : decimals,
  }).format(value);
};

/**
 * Formats a number with appropriate decimal places
 * @param value Number to format
 * @param decimals Maximum decimal places (default: 2)
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Formats a percentage value
 * @param value Percentage value (e.g. 10.5 for 10.5%)
 * @returns Formatted percentage string
 */
export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
