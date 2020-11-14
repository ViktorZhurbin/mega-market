import { NextApiResponse } from 'next';

import { withUser, ApiRequest } from '@src/utils/api/middleware';

const handler = async (req: ApiRequest, res: NextApiResponse): Promise<any> => {
    try {
        const { method, user } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        const cart = await user.clearCart();

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
