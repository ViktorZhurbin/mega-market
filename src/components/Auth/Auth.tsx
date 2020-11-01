import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './Auth.module.css';

export const Auth: React.FC = () => {
    const [session, loading] = useSession();

    const getComponent = () => {
        if (loading) {
            return <span>Loading session...</span>;
        }
        if (session) {
            return (
                <div className={styles.signOut}>
                    <span>
                        Signed in as {session.user.name || session.user.email}
                    </span>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            );
        }

        return <button onClick={() => signIn()}>Sign in</button>;
    };

    return <div className={styles.container}>{getComponent()}</div>;
};
