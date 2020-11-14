import { useState } from 'react';

import { UserType } from '~user/typings';

import styles from './User.module.css';

export const User: React.FC<{ user: Partial<UserType> }> = ({ user }) => {
    const [imageError, setImageError] = useState(false);

    return (
        user && (
            <div className={styles.container}>
                {user.image && !imageError ? (
                    <img
                        className={styles.photo}
                        src={user.image}
                        alt="User Photo"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={styles.fallbackPhoto}>{user.name[0]}</div>
                )}
                <span className={styles.name}>{user.name || user.email}</span>
            </div>
        )
    );
};
