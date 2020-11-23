import { useSession } from 'next-auth/client';
import { createContext } from 'react';

import { useData } from '@/hooks/useData';
import { CartResponse, CartType } from '@/modules/cart/typings';

export const CartContext = createContext<CartResponse | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
    const [session] = useSession();

    const cart = useData<CartType>(
        session ? `/api/user/cart/${session.userId}` : null
    );

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
