import { NextApiResponse } from 'next';

import { ApiRequest, withUser } from '@/utils/api/middleware';

const handler = async (req: ApiRequest, res: NextApiResponse): Promise<any> => {
    try {
        const {
            method,
            body: { product },
            user,
        } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!product) {
            throw new Error('Missing required field: product');
        }

        const updatedCart = await user.addToCart(product);

        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
