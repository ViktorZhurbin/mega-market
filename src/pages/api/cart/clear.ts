import { NextApiResponse } from 'next';

import { CartApiRequest, withCart } from '@/utils/api/middleware';

const handler = async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, cart } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        cart.set({ products: [] });
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default withCart(handler);
