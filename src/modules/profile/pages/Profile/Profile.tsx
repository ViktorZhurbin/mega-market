import { signIn, signOut, useSession } from 'next-auth/client';
import useSwr from 'swr';

import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';

import { User } from '../../components/User';

export const Profile: React.FC = () => {
    const [session, loading] = useSession();
    const { data, error } = useSwr(!session ? null : '/api/user');

    console.table(data?.user, ['name', 'image', 'role']);

    const handleSignOut = () => signOut({ callbackUrl: '/' });
    const getButton = () =>
        session ? (
            <Button color="red" onClick={handleSignOut}>
                Sign out
            </Button>
        ) : (
            <Button onClick={signIn}>Sign In</Button>
        );

    const getComponent = () => {
        if (loading || (!data && !error)) {
            return <h1>Loading...</h1>;
        }
        if (data?.user) {
            return <User user={data.user} />;
        }

        return <h2>Please Sign In</h2>;
    };

    return <Layout stickyItem={getButton()}>{getComponent()}</Layout>;
};
