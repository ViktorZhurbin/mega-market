import { signIn, useSession } from 'next-auth/client';

import { Button } from '@/components/Button';
import { useCart } from '@/hooks/useCart';
import { addToCart } from '@/modules/cart/services';
import { ProductType } from '@/modules/product/typings';
import { getDeclension } from '@/utils/string';

export const CartButton: React.FC<{ product: ProductType }> = ({ product }) => {
    const [session, loading] = useSession();
    const { data, isLoading, mutate } = useCart();
    const cartItem = data?.products.find((item) => {
        return item.product._id === product._id;
    });
    const isInCart = Boolean(cartItem);

    const handleAddToCart = async () => {
        await addToCart(product);
        mutate();
    };
    const cartBtnText = isInCart
        ? `${getDeclension('item', cartItem.quantity)} in cart`
        : 'Add to cart';

    const AddToCartButton = (
        <Button color={isInCart ? 'green' : 'blue'} onClick={handleAddToCart}>
            {cartBtnText}
        </Button>
    );
    const SignInButton = <Button onClick={signIn}>Sign In</Button>;

    const StickyButton = session ? AddToCartButton : SignInButton;

    return loading || isLoading ? null : StickyButton;
};
