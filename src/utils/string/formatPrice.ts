export const formatPrice = (number: number | string): string =>
    new Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(Number(number));
