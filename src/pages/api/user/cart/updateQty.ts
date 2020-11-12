import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { dbConnect } from '@src/utils/db/initDb';
import { UserModel } from '@user/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { productId, qty },
        } = req;

        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!productId) {
            throw new Error('Missing required field: productId');
        }
        if (!qty) {
            throw new Error('Missing required field: qty');
        }

        await dbConnect();

        const user = await UserModel.findOne({ _id: session.userId });
        const updatedCart = await user.updateCartQty(productId, qty);

        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
