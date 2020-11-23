import { NextApiResponse } from 'next';

import { CartApiRequest, withCart } from '@/utils/api/middleware';

const handler = async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, query, cart } = req;

        if (!query?.userId) {
            throw new Error('Missing required query param: userId');
        }

        if (method === 'GET') {
            res.status(200).json(cart);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default withCart(handler);
