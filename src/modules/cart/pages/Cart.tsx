import { ProductType } from '@product/typings';
import { Layout } from '@src/components/Layout';
import { CartItem } from '../components/CartItem';

import styles from './Cart.module.css';

type CartItem = {
    product: ProductType;
    quantity: string;
};

type Props = {
    cartItems: CartItem[];
};

const mock: CartItem[] = [
    {
        product: {
            _id: '1',
            title: 'Dummy Title',
            price: '119.99',
            description: '',
            image: '/images/1.webp',
        },
        quantity: '1',
    },
];

export const Cart: React.FC<Props> = ({ cartItems = mock }) => {
    // TODO:
    // - add User model
    // - add Cart model
    // - useData to fetch user cart
    // - update qty POST request onChange
    // - optimistic UI response
    return (
        <Layout>
            <div className={styles.container}>
                {cartItems.map(({ product, quantity }) => (
                    <CartItem
                        key={product._id}
                        product={product}
                        quantity={quantity}
                    />
                ))}
            </div>
        </Layout>
    );
};
