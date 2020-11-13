import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@src/components/Button';
import { CartItem } from '../CartItem';
import { Summary } from '../Summary';
import styles from './CartProducts.module.css';
import { createCheckoutSession } from '../../services';
import { UserContext } from '@src/contexts';
import { useContext } from 'react';
import { EmptyCart } from '../EmptyCart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const CartProducts: React.FC = () => {
    const user = useContext(UserContext);
    const order = user?.data?.order;
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        await createCheckoutSession(order, stripe);
    };

    if (!order?.totalQuantity) {
        return <EmptyCart />;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cart</h1>
            {order.products.map(({ product, quantity }) => (
                <CartItem
                    key={product._id}
                    product={product}
                    quantity={quantity}
                    onChange={user.mutate}
                />
            ))}
            <Button
                className={styles.checkoutBtn}
                color="green"
                onClick={handleCheckout}
            >
                Checkout
            </Button>
            <Summary qty={order.totalQuantity} amount={order.totalAmount} />
        </div>
    );
};
