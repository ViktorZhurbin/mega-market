import { useSession } from 'next-auth/client';

import { UserType } from '@user/typings';
import { OrderType } from '@cart/typings';
import { Layout } from '@src/components/Layout';
import { useData } from '@src/hooks/useData';
import { CartItemType } from '../../typings';
import { EmptyCart } from '../../components/EmptyCart';
import { CartProducts } from '../../components/CartProducts';

type Props = {
    cartItems: CartItemType[];
};

export const Cart: React.FC<Props> = () => {
    const [session] = useSession();

    const { data, isLoading, mutate } = useData<{
        user: UserType;
        order: OrderType;
    }>(session ? `/api/user/${session.userId}` : null);

    if (isLoading) {
        return <div>Loading Cart...</div>;
    }

    return (
        <Layout>
            {data?.order.totalQuantity ? (
                <CartProducts onChange={mutate} order={data.order} />
            ) : (
                <EmptyCart />
            )}
        </Layout>
    );
};
