import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';

import { Button } from '@/components/Button';
import { CartContext } from '@/contexts';

import { createCheckoutSession } from '@/modules/user/services';
import { CartItem } from '../CartItem';
import { EmptyCart } from '../EmptyCart';
import { Summary } from '../Summary';
import styles from './Cart.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Cart: React.FC = () => {
    const cart = useContext(CartContext);
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        await createCheckoutSession(cart.data, stripe);
    };

    if (cart?.isLoading) {
        return <div>Loading cart...</div>;
    }

    if (!cart?.data.products.length) {
        return <EmptyCart />;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cart</h1>
            {cart.data.products.map(({ product, quantity }) => (
                <CartItem
                    key={product._id}
                    product={product}
                    quantity={quantity}
                    onChange={cart.mutate}
                />
            ))}
            <Button
                className={styles.checkoutBtn}
                color="green"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
            <Summary quantity={cart.data.quantity} total={cart.data.total} />
        </div>
    );
};
