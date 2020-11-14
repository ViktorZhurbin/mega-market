import { NextApiResponse } from 'next';

import { withUser, ApiRequest } from '@/utils/api/middleware';
import { OrderModel } from '~cart/models';

const handler = async (req: ApiRequest, res: NextApiResponse): Promise<any> => {
    try {
        const { method, query, user } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        if (!query?.id) {
            throw new Error('Missing required query param: id');
        }

        const totalQuantity = await user.getCartQty();
        const totalAmount = await user.getCartAmount();

        const order = new OrderModel({
            user: {
                id: query.id,
            },
            items: user.cart,
            totalQuantity,
            totalAmount,
        });

        res.status(200).json({ success: true, data: { user, order } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
