import { UserType } from '@user/typings';
import styles from './User.module.css';

export const User: React.FC<{ user: Partial<UserType> }> = ({ user }) => {
    return (
        user && (
            <div className={styles.container}>
                {user.image && (
                    <img
                        className={styles.photo}
                        src={user.image}
                        alt="User Photo"
                    />
                )}
                <span className={styles.name}>{user.name || user.email}</span>
            </div>
        )
    );
};
