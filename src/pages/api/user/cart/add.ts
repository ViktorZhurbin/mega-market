import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { dbConnect } from '@src/utils/db/initDb';
import { User } from '@src/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, body } = req;

        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!body) {
            throw new Error('Missing required field: body');
        }

        await dbConnect();

        const user = await User.findOne({ _id: session.userId });
        const isInCart = user.cart.find((item) => item._id === body._id);
        const newCart = isInCart
            ? user.cart.map((item) =>
                  item.product._id === body._id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
              )
            : [...user.cart, body];

        const newUser = await User.findOneAndUpdate(
            { _id: session.userId },
            { cart: newCart },
            { new: true }
        );

        res.status(200).json({ success: true, data: newUser.cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
