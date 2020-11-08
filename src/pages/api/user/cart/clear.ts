import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { User } from '@src/models';
import { dbConnect } from '@src/utils/db/initDb';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method } = req;
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        await dbConnect();

        const user = await User.findOneAndUpdate(
            { _id: session.userId },
            { cart: [] },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: user.cart,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
