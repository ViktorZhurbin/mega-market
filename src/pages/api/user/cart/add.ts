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

        console.log('body', body);

        await dbConnect();

        const user = await User.findOneAndUpdate(
            { _id: session.userId },
            { $push: { cart: body } },
            { new: true }
        );

        res.status(201).json({ success: true, data: user.cart });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
