import { useEffect } from 'react';
import { clearCart } from '@src/modules/admin/services';
import { Layout } from '@src/components/Layout';

import styles from './Success.module.css';

export const Success: React.FC = () => {
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <Layout>
            <div className={styles.title}>Payment Successful!</div>
        </Layout>
    );
};
