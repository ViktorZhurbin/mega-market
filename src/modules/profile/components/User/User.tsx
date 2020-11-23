import { useSession } from 'next-auth/client';
import { useState } from 'react';

import { ControlButtons } from '@/modules/admin/components/ControlButtons';

import styles from './User.module.css';

export const User: React.FC = () => {
    const [imageError, setImageError] = useState(false);
    const [session, loading] = useSession();

    return (
        !loading && (
            <div className={styles.container}>
                <div className={styles.header}>
                    {session.user.image && !imageError ? (
                        <img
                            className={styles.photo}
                            src={session.user.image}
                            alt="User Photo"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className={styles.fallbackPhoto}>
                            {session.user.name[0]}
                        </div>
                    )}
                    <span className={styles.name}>
                        {session.user.name || session.user.email}
                    </span>
                </div>
                {session?.userRole === 'admin' && <ControlButtons />}
            </div>
        )
    );
};
