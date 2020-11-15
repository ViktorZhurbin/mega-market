import { NextApiResponse } from 'next';

import { PopulatedCartItemType } from '@/modules/cart/typings';
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

        const { cart } = await user.populate('cart.product').execPopulate();
        const quantity = cart.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        const total = (cart as PopulatedCartItemType[]).reduce(
            (total, { product, quantity }) => total + product.price * quantity,
            0
        );

        res.status(200).json({
            success: true,
            data: {
                ...user.toObject(),
                cart: {
                    products: cart,
                    quantity,
                    total,
                },
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default withUser(handler);
