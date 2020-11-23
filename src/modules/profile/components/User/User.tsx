import { useState } from 'react';

import { ControlButtons } from '@/modules/admin/components/ControlButtons';
import { UserType } from '@/modules/user/typings';

import styles from './User.module.css';

export const User: React.FC<{ user: UserType }> = ({ user }) => {
    const [imageError, setImageError] = useState(false);

    if (!user) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {user.image && !imageError ? (
                    <img
                        className={styles.photo}
                        src={user.image}
                        alt="User Photo"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={styles.fallbackPhoto}>{user.name?.[0]}</div>
                )}
                <span className={styles.name}>{user.name || user.email}</span>
            </div>
            {user.role === 'admin' && <ControlButtons />}
        </div>
    );
};
