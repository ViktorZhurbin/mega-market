import { useEffect } from 'react';

import { Layout } from '@/components/Layout';
import { clearCart } from '@/modules/admin/services';

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
