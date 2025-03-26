export const currencyFormatter = (value: number | string) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
  });

  return formatter.format(Number(value));
};
