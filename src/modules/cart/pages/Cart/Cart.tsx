import { Layout } from '@/components/Layout';

import { Cart } from '../../components/Cart';
import { CheckoutButton } from '../../components/CheckoutButton';
import { CartItemType } from '../../typings';

type Props = {
    cartItems: CartItemType[];
};

export const CartPage: React.FC<Props> = () => {
    return (
        <Layout stickyItem={<CheckoutButton />}>
            <Cart />
        </Layout>
    );
};
