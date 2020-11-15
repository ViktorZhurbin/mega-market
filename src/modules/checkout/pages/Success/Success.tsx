import { useEffect } from 'react';

import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { clearCart } from '@/modules/cart/services';

import styles from './Success.module.css';

export const Success: React.FC = () => {
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Payment Successful!</h1>
                <Button route="/">Continue shopping</Button>
            </div>
        </Layout>
    );
};
