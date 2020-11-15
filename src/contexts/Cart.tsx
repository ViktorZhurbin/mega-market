import { createContext } from 'react';

import { Response, useData } from '@/hooks/useData';
import { CartResponseType } from '@/modules/cart/typings';

export const CartContext = createContext<Response<CartResponseType> | null>(
    null
);

export const CartProvider: React.FC = ({ children }) => {
    const cart = useData<CartResponseType>('/api/user/cart');

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
