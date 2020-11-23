import { useContext } from 'react';

import { CartContext } from '@/contexts';
import { CartResponse } from '@/modules/cart/typings';

export const useCart = (): CartResponse => {
    const cart = useContext(CartContext);

    return cart;
};
