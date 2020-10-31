import { formatPrice } from './formatPrice';

test('formats 0 to price', () => {
    expect(formatPrice(0)).toBe('€0.00');
});

test('formats 1000000.09 to price', () => {
    expect(formatPrice(1000000.09)).toBe('€1,000,000.09');
});

test('formats "1010001.99" string to price', () => {
    expect(formatPrice('1001001.99')).toBe('€1,001,001.99');
});
