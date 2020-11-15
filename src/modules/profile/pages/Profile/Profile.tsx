import { signIn, signOut, useSession } from 'next-auth/client';

import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';

import { User } from '../../components/User/User';

export const Profile: React.FC = () => {
    const [session] = useSession();

    const handleSignOut = () => signOut({ callbackUrl: '/' });
    const getButton = () =>
        session ? (
            <Button color="red" onClick={handleSignOut}>
                Sign out
            </Button>
        ) : (
            <Button onClick={signIn}>Sign In</Button>
        );

    return (
        <Layout stickyItem={getButton()}>
            {session?.user ? (
                <User user={session.user} />
            ) : (
                <div>
                    <h2>Please sign in</h2>
                </div>
            )}
        </Layout>
    );
};
