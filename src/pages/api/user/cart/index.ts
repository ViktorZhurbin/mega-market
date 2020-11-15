import { NextApiResponse } from 'next';

import { UserApiRequest, withUser } from '@/utils/api/middleware';

const handler = async (
    req: UserApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, user } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        const quantity = await user.getCartQty();
        const total = await user.getCartAmount();
        const { cart } = await user.populate('cart.product').execPopulate();

        res.status(200).json({
            success: true,
            data: {
                userId: user._id,
                products: cart,
                quantity,
                total,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
