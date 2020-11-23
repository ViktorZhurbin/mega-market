import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@/components/Button';
import { useCart } from '@/hooks/useCart';
import { createCheckoutSession } from '@/modules/cart/services';

import { CartItem } from '../CartItem';
import { EmptyCart } from '../EmptyCart';
import { Summary } from '../Summary';
import styles from './Cart.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Cart: React.FC = () => {
    const { data: cart, isLoading, mutate } = useCart();
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        await createCheckoutSession(stripe);
    };

    if (isLoading) {
        return <div>Loading cart...</div>;
    }

    if (!cart.products.length) {
        return <EmptyCart />;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cart</h1>
            {cart.products.map(({ product, quantity }) => (
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
            <Summary quantity={cart.quantity} total={cart.total} />
        </div>
    );
};
