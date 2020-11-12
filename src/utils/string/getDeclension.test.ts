import { getDeclension } from './getDeclension';

test('get declension for 1 item', () => {
    expect(getDeclension('item', 1)).toBe('1 item');
});

test('get declension for 100 apples', () => {
    expect(getDeclension('apple', 100)).toBe('100 apples');
});

test('get declension for ', () => {
    expect(getDeclension('product', 0)).toBe('0 products');
});
