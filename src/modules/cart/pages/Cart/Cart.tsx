import { Layout } from '@src/components/Layout';
import { CartItemType } from '../../typings';
import { CartProducts } from '../../components/CartProducts';

type Props = {
    cartItems: CartItemType[];
};

export const Cart: React.FC<Props> = () => {
    return (
        <Layout>
            <CartProducts />
        </Layout>
    );
};
