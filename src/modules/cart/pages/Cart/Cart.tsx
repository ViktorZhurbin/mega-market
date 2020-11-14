import { Layout } from '@/components/Layout';
import { CartItemType } from '../../typings';
import { Cart } from '../../components/Cart';

type Props = {
    cartItems: CartItemType[];
};

export const CartPage: React.FC<Props> = () => {
    return (
        <Layout>
            <Cart />
        </Layout>
    );
};
