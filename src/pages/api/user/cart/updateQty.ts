import { NextApiResponse } from 'next';

import { UserApiRequest, withUser } from '@/utils/api/middleware';

const handler = async (
    req: UserApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { productId, quantity },
            user,
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

        const updatedUser = await user.updateCartQty(productId, quantity);

        if (!updatedUser) {
            throw new Error(
                `Couldn't update quntity for productId: ${productId} in cart`
            );
        }

        res.status(200).json({ success: true, data: updatedUser.cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
