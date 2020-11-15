import { useContext, useState } from 'react';

import { UserContext } from '@/contexts';
import { ControlButtons } from '@/modules/admin/components/ControlButtons';

import styles from './User.module.css';

export const User: React.FC = () => {
    const [imageError, setImageError] = useState(false);
    const { data, isLoading } = useContext(UserContext);

    return (
        !isLoading && (
            <div className={styles.container}>
                <div className={styles.header}>
                    {data.image && !imageError ? (
                        <img
                            className={styles.photo}
                            src={data.image}
                            alt="User Photo"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className={styles.fallbackPhoto}>
                            {data.name[0]}
                        </div>
                    )}
                    <span className={styles.name}>
                        {data.name || data.email}
                    </span>
                </div>
                {data?.role === 'admin' && <ControlButtons />}
            </div>
        )
    );
};
