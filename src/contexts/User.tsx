import { createContext } from 'react';

import { Response, useData } from '@/hooks/useData';
import { UserWithExtendedCartType } from '@/modules/user/typings';

export const UserContext = createContext<Response<
    UserWithExtendedCartType
> | null>(null);

export const UserProvider: React.FC = ({ children }) => {
    const cart = useData<UserWithExtendedCartType>('/api/user');

    return <UserContext.Provider value={cart}>{children}</UserContext.Provider>;
};
