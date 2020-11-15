import { signIn, useSession } from 'next-auth/client';
import { useContext } from 'react';

import { Button } from '@/components/Button';
import { UserContext } from '@/contexts';
import { addToCart } from '@/modules/cart/services';
import { getDeclension } from '@/utils/string';

export const CartButton: React.FC<{ productId: string }> = ({ productId }) => {
    const [session, loading] = useSession();
    const { data, isLoading, mutate } = useContext(UserContext);
    const cartItem = data?.cart.products.find(({ product }) => {
        return product._id === productId;
    });
    const isInCart = Boolean(cartItem);

    const handleAddToCart = async () => {
        await addToCart(productId);
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
