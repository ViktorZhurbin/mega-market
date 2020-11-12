import { useSession } from 'next-auth/client';

import { CartItemType } from '../../typings';
import { UserType } from '@user/typings';
import { OrderType } from '@cart/typings';
import { Layout } from '@src/components/Layout';
import { useData } from '@src/hooks/useData';
import { CartItem } from '../../components/CartItem';

import styles from './Cart.module.css';
import { Empty } from './Empty';

type Props = {
    cartItems: CartItemType[];
};

export const Cart: React.FC<Props> = () => {
    const [session] = useSession();

    const { data } = useData<{ user: UserType; order: OrderType }>(
        session ? `/api/user/${session.userId}` : null
    );

    return (
        <Layout>
            {data?.order.totalQuantity ? (
                <div className={styles.container}>
                    {data?.order.products.map(({ product, quantity }) => (
                        <CartItem
                            key={product._id}
                            product={product}
                            quantity={quantity}
                        />
                    ))}
                </div>
            ) : (
                <Empty />
            )}
        </Layout>
    );
};
