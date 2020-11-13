import { useSession } from 'next-auth/client';

import { UserResponse } from '@user/typings';
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

    const { data, isLoading, mutate } = useData<UserResponse>(
        session ? `/api/user/${session.userId}` : null
    );

    if (session && isLoading) {
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
