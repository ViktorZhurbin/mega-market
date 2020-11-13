import { NextApiResponse } from 'next';

import { user, ApiRequest } from '@src/utils/api/middleware';
import { OrderModel } from '@cart/models';
import { ProductType } from '@src/modules/product/typings';

const handler = async (req: ApiRequest, res: NextApiResponse): Promise<any> => {
    try {
        const { method, query, user } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        if (!query?.id) {
            throw new Error('Missing required query param: id');
        }

        const { cart } = await user.populate('cart.product').execPopulate();
        let totalQuantity = 0;
        let totalAmount = 0;
        const products = cart.map(({ quantity, product }) => {
            totalQuantity += quantity;
            // convert type after using mongoose populate
            const price = (<ProductType>product).price;
            totalAmount += price * quantity;

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

        res.status(200).json({ success: true, data: { user, order } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default user(handler);
