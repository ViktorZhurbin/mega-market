import { NextApiResponse } from 'next';

import { CartApiRequest, withCart } from '@/utils/api/middleware';

const handler = async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { productId, quantity },
            cart,
        } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!productId) {
            throw new Error('Missing required field: productId');
        }
        if (!quantity) {
            throw new Error('Missing required field: quantity');
        }

        cart.products.id(productId).set({ quantity });
        const updatedCart = await cart.save();

        if (!updatedCart) {
            throw new Error(
                `Couldn't update quntity for productId: ${productId} in cart`
            );
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default withCart(handler);
