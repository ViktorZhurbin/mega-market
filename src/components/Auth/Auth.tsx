import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './Auth.module.css';

export const Auth: React.FC = () => {
    const [session, loading] = useSession();

    if (loading) {
        return <span>Loading session...</span>;
    }

    return !session ? (
        <button onClick={() => signIn()}>Sign in</button>
    ) : (
        <div className={styles.signOut}>
            <span>Signed in as {session.user.name || session.user.email}</span>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};
