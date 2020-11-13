import { createContext } from 'react';
import { useSession } from 'next-auth/client';

import { useData, Response } from '@src/hooks/useData';
import { UserResponse } from '@user/typings';

export const UserContext = createContext<Response<UserResponse> | null>(null);

export const UserProvider: React.FC = ({ children }) => {
    const [session] = useSession();

    const user = useData<UserResponse>(
        session ? `/api/user/${session.userId}` : null
    );

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
