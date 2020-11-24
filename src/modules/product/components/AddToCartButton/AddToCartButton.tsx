import { signIn, useSession } from 'next-auth/client';

import { Button } from '@/components/Button';
import { useCart } from '@/hooks/useCart';
import { addToCart } from '@/modules/cart/services';
import { CartItemType } from '@/modules/cart/typings';
import { getDeclension } from '@/utils/string';

import { ProductType } from '../../typings';
import styles from './AddToCartButton.module.css';

type Props = {
    product: ProductType;
};

const getSplitBtn = (
    cartItem: CartItemType,
    handleAddToCart: () => Promise<void>
) => (
    <div className={styles.splitBtn}>
        <Button route="/cart" color="green">
            <div className={styles.btnText}>
                {getDeclension('item', cartItem.quantity)} in cart
                <div className={styles.goToCart}>Go to cart</div>
            </div>
        </Button>
        <Button onClick={handleAddToCart}>+1</Button>
    </div>
);

export const AddToCartButton: React.FC<Props> = ({ product }) => {
    const { data: cart, isLoading, mutate } = useCart();
    const [session, loading] = useSession();
    const cartItem = cart?.products?.find((item) => {
        return item.product._id === product._id;
    });
    const isInCart = Boolean(cartItem);

    const handleAddToCart = async () => {
        await addToCart(product);
        return mutate();
    };

    const CartButton = isInCart ? (
        getSplitBtn(cartItem, handleAddToCart)
    ) : (
        <Button onClick={handleAddToCart}>Add to cart</Button>
    );

    const SignInButton = <Button onClick={signIn}>Sign In</Button>;

    const StickyButton = session ? CartButton : SignInButton;

    return loading || isLoading ? null : StickyButton;
};
