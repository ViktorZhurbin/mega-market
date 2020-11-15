import { NextApiResponse } from 'next';

import { UserApiRequest, withUser } from '@/utils/api/middleware';

const handler = async (
    req: UserApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, user } = req;

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        const updatedUser = await user.clearCart();

        if (!updatedUser) {
            throw new Error(`Couldn't clear cart`);
        }

        res.status(200).json({
            success: true,
            data: updatedUser.cart,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
