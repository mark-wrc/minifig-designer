export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string => {
  if (isNaN(value)) return '$0.00';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
