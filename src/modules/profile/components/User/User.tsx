import { UserType } from '@user/typings';
import Image from 'next/image';
import styles from './User.module.css';

export const User: React.FC<{ user: Partial<UserType> }> = ({ user }) => {
    return (
        user && (
            <div className={styles.container}>
                {user.image && (
                    <Image
                        className={styles.photo}
                        src={user.image}
                        width={64}
                        height={64}
                    />
                )}
                <span className={styles.name}>{user.name || user.email}</span>
            </div>
        )
    );
};
