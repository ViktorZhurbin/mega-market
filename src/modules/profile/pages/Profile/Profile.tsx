import { signIn, useSession } from 'next-auth/client';
import useSwr from 'swr';

import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';

import { User } from '../../components/User';

export const Profile: React.FC = () => {
    const [session, loading] = useSession();
    const { data, error } = useSwr(!session ? null : '/api/user');

    const getComponent = () => {
        if (loading && !data && !error) {
            return <h1>Loading...</h1>;
        }
        if (data?.user) {
            return <User user={data.user} />;
        }

        return (
            <>
                <h2>Please Sign In</h2>
                <Button onClick={signIn}>Sign In</Button>
            </>
        );
    };

    return <Layout>{getComponent()}</Layout>;
};
