import { signIn, signOut } from 'next-auth/client';
import { UserType } from '@user/typings';
import styles from './Auth.module.css';

export const Auth: React.FC<{ user: Partial<UserType> }> = ({ user }) => {
    const getComponent = () => {
        if (user) {
            return (
                <div className={styles.signOut}>
                    <span>Signed in as {user.name || user.email}</span>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            );
        }

        return <button onClick={() => signIn()}>Sign in</button>;
    };

    return <div className={styles.container}>{getComponent()}</div>;
};
