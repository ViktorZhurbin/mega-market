import { createContext } from 'react';

import { Response, useData } from '@/hooks/useData';
import { PopulatedCartItemType } from '@/modules/cart/typings';
import { SessionUserType } from '@/modules/user/typings';

type Data = SessionUserType & {
    cart: {
        products: PopulatedCartItemType[];
        quantity: number;
        total: number;
    };
};

export const UserContext = createContext<Response<Data> | null>(null);

export const UserProvider: React.FC = ({ children }) => {
    const cart = useData<Data>('/api/user');

    return <UserContext.Provider value={cart}>{children}</UserContext.Provider>;
};
