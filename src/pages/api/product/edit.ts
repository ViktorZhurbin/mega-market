import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from '../../../utils/initDb';
import { Product } from '../../../models/Product';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { payload },
        } = req;
        const { userId } = await getSession({ req });

        if (!userId) {
            throw new Error('Not signed in');
        }

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!payload) {
            throw new Error('Missing required field: payload');
        }

        await connectDb();

        const { id: _id, title, price } = payload;
        const product = await Product.findOneAndUpdate(
            { _id },
            { title, price },
            { new: true }
        );

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
