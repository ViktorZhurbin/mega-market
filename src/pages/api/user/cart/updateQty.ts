import { NextApiResponse } from 'next';

import { withUser, ApiRequest } from '@/utils/api/middleware';

const handler = async (req: ApiRequest, res: NextApiResponse): Promise<any> => {
    try {
        const {
            method,
            body: { productId, qty },
            user,
        } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!productId) {
            throw new Error('Missing required field: productId');
        }
        if (!qty) {
            throw new Error('Missing required field: qty');
        }

        const updatedCart = await user.updateCartQty(productId, qty);

        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
