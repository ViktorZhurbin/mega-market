import { NextApiResponse } from 'next';

import { CartApiRequest, withCart } from '@/utils/api/middleware';

const handler = async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { product },
            cart,
        } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!product) {
            throw new Error('Missing required field: product');
        }

        const cartItem = cart.products.id(product._id);

        cartItem
            ? cartItem.set({ quantity: cartItem.quantity + 1 })
            : cart.products.push({ _id: product._id, product, quantity: 1 });

        const updatedCart = await cart.save();

        if (!updatedCart) {
            throw new Error(`Couldn't add productId: ${product._id} to cart`);
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default withCart(handler);
