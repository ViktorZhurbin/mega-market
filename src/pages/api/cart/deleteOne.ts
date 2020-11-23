import { NextApiResponse } from 'next';

import { CartApiRequest, withCart } from '@/utils/api/middleware';

const handler = async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { productId },
            cart,
        } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!productId) {
            throw new Error('Missing required field: productId');
        }

        cart.products.id(productId).remove();

        const updatedCart = await cart.save();

        if (!updatedCart) {
            throw new Error(
                `Couldn't delete productId: ${productId} from cart`
            );
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default withCart(handler);
