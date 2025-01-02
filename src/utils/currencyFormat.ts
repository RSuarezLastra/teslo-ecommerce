export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat('es-Mx', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(value);
}