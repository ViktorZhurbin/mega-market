export const getDeclension = (word: string, qty: number): string =>
    qty === 1 ? `${qty} ${word}` : `${qty} ${word}s`;
