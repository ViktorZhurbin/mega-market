import { useSession } from 'next-auth/client';
import { createContext, useMemo } from 'react';

import { useData } from '@/hooks/useData';
import { CartResponse, CartType } from '@/modules/cart/typings';

export const CartContext = createContext<CartResponse | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
    const [session] = useSession();

    const cart = useData<CartType>(
        session ? `/api/cart/${session.userId}` : null
    );
    const value = useMemo(() => cart, [cart]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
