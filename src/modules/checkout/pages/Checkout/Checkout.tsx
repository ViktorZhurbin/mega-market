import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';

import { Layout } from '@/components/Layout';
import { UserContext } from '@/contexts';
import { formatPrice } from '@/utils/string';

import CardForm from '../../components/CardForm/CardForm';
import styles from './Checkout.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Checkout: React.FC = () => {
    const { data, isLoading } = useContext(UserContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Card payment</h1>
                    {data.cart.total && (
                        <div className={styles.titleWrapper}>
                            <p className={styles.total}>Total</p>
                            <span className={styles.title}>
                                {formatPrice(data.cart.total)}
                            </span>
                        </div>
                    )}
                    <CardForm />
                </div>
            </Layout>
        </Elements>
    );
};
