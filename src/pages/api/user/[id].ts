import { NextApiResponse, NextApiRequest } from 'next';

import { dbConnect } from '@src/utils/db/initDb';
import { User } from '@user/models';
import { Order } from '@cart/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, query } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        if (!query?.id) {
            throw new Error('Missing required query param: id');
        }

        await dbConnect();

        const user = await User.findOne({ _id: query.id });
        const order = await user
            .populate('cart.productId')
            .execPopulate()
            .then((user) => {
                let totalQuantity = 0;
                const products = user.cart.map(({ quantity, productId }) => {
                    totalQuantity += quantity;

                    return {
                        quantity,
                        product: { ...productId._doc },
                    };
                });
                const order = new Order({
                    user: {
                        id: query.id,
                    },
                    products,
                    totalQuantity,
                });

                return order.save();
            });

        res.status(200).json({ success: true, data: { user, order } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
