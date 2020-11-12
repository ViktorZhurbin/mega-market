import { OrderType } from '@cart/typings';
import { Button } from '@src/components/Button';
import { CartItem } from '../CartItem';
import { Summary } from '../Summary';
import styles from './CartProducts.module.css';

type Props = {
    onChange: () => void;
    order: OrderType;
};

export const CartProducts: React.FC<Props> = ({ onChange, order }) => (
    <div className={styles.container}>
        <h1 className={styles.title}>Cart</h1>
        {order.products.map(({ product, quantity }) => (
            <CartItem
                key={product._id}
                product={product}
                quantity={quantity}
                onChange={onChange}
            />
        ))}
        <Button
            className={styles.checkoutBtn}
            color="green"
            onClick={() => null}
        >
            Checkout
        </Button>
        <Summary qty={order.totalQuantity} amount={order.totalAmount} />
    </div>
);
