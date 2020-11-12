import { ProductType } from '@product/typings';
import { UserType } from '@user/typings';
import { OrderType } from '@cart/typings';
import { Layout } from '@src/components/Layout';
import { useData } from '@src/hooks/useData';
import { CartItem } from '../components/CartItem';

import styles from './Cart.module.css';
import { useSession } from 'next-auth/client';

type CartItem = {
    product: ProductType;
    quantity: string;
};

type Props = {
    cartItems: CartItem[];
};

export const Cart: React.FC<Props> = () => {
    const [session] = useSession();

    const { data } = useData<{ user: UserType; order: OrderType }>(
        session ? `/api/user/${session.userId}` : null
    );

    // TODO:
    // - update qty POST request onChange
    return (
        <Layout>
            {data?.order && (
                <div className={styles.container}>
                    {data?.order.products.map(({ product, quantity }) => (
                        <CartItem
                            key={product._id}
                            product={product}
                            quantity={quantity}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
};
