import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';

import { Button } from '@/components/Button';
import { UserContext } from '@/contexts';
import { createCheckoutSession } from '@/modules/cart/services';

import { CartItem } from '../CartItem';
import { EmptyCart } from '../EmptyCart';
import { Summary } from '../Summary';
import styles from './Cart.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Cart: React.FC = () => {
    const { data, isLoading, mutate } = useContext(UserContext);
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        await createCheckoutSession(stripe);
    };

    if (isLoading) {
        return <div>Loading cart...</div>;
    }

    if (!data?.cart?.quantity) {
        return <EmptyCart />;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cart</h1>
            {data.cart.products.map(({ product, quantity }) => (
                <CartItem
                    key={product._id}
                    product={product}
                    quantity={quantity}
                    onChange={mutate}
                />
            ))}
            <Button
                className={styles.checkoutBtn}
                color="green"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
            <Summary quantity={data.cart.quantity} total={data.cart.total} />
        </div>
    );
};
