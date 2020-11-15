import { signIn, useSession } from 'next-auth/client';
import { useContext } from 'react';

import { Button } from '@/components/Button';
import { CartContext } from '@/contexts';
import { addToCart } from '@/modules/user/services';
import { getDeclension } from '@/utils/string';

export const CartButton: React.FC<{ productId: string }> = ({ productId }) => {
    const [session, loading] = useSession();
    const cart = useContext(CartContext);
    const cartItem = cart?.data?.products.find(({ product }) => {
        return product._id === productId;
    });
    const isInCart = Boolean(cartItem);

    const handleAddToCart = async () => {
        await addToCart(productId);
        cart?.mutate();
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

    return loading || cart.isLoading ? null : StickyButton;
};
