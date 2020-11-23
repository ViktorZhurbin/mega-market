import { NextApiResponse } from 'next';

import { CartApiRequest, withCart } from '@/utils/api/middleware';

const handler = async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, query, cart } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        if (!query?.userId) {
            throw new Error('Missing required query param: userId');
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withCart(handler);
