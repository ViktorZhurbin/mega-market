import { Layout } from '@src/components/Layout';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CardForm from '../../components/CardForm/CardForm';
import styles from './Checkout.module.css';
import { useSession } from 'next-auth/client';

import { UserType } from '@user/typings';
import { OrderType } from '@cart/typings';
import { useData } from '@src/hooks/useData';
import { formatPrice } from '@src/utils/string';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Checkout: React.FC = () => {
    const [session] = useSession();

    const { data, isLoading } = useData<{
        user: UserType;
        order: OrderType;
    }>(session ? `/api/user/${session.userId}` : null);

    if (session && isLoading) {
        return <div>Loading Cart...</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Card payment</h1>
                    {data?.order.totalAmount && (
                        <div className={styles.titleWrapper}>
                            <p className={styles.total}>Total</p>
                            <span className={styles.title}>
                                {formatPrice(data?.order.totalAmount)}
                            </span>
                        </div>
                    )}
                    <CardForm />
                </div>
            </Layout>
        </Elements>
    );
};
