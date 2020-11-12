import { useSession, signIn, signOut } from 'next-auth/client';

import { Button } from '@src/components/Button';
import { Layout } from '@src/components/Layout';
import { User } from '../../components/User/User';

export const Profile: React.FC = () => {
    const [session] = useSession();

    const getButton = () =>
        session ? (
            <Button
                color="secondary"
                onClick={() => signOut({ callbackUrl: '/' })}
            >
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
