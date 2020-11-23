import { useCart } from '@/hooks/useCart';

import { CartItem } from '../CartItem';
import { EmptyCart } from '../EmptyCart';
import { Summary } from '../Summary';
import styles from './Cart.module.css';

export const Cart: React.FC = () => {
    const { data: cart, isLoading, mutate } = useCart();

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
            <Summary quantity={cart.quantity} total={cart.total} />
        </div>
    );
};
