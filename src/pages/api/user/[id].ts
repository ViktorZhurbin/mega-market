import { NextApiResponse, NextApiRequest } from 'next';

import { dbConnect } from '@src/utils/api/db';
import { UserModel } from '@user/models';
import { OrderModel } from '@cart/models';

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

        const user = await UserModel.findOne({ _id: query.id });
        const order = await user
            .populate('cart.productId')
            .execPopulate()
            .then((user) => {
                let totalQuantity = 0;
                let totalAmount = 0;
                const products = user.cart.map(({ quantity, productId }) => {
                    const product = { ...productId._doc };
                    totalQuantity += quantity;
                    totalAmount += product.price * quantity;

                    return {
                        quantity,
                        product,
                    };
                });
                const order = new OrderModel({
                    user: {
                        id: query.id,
                    },
                    products,
                    totalQuantity,
                    totalAmount,
                });

                return order.save();
            });

        res.status(200).json({ success: true, data: { user, order } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
