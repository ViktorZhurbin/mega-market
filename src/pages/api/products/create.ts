import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from '@/utils/initDb';
import { Product } from '@/models/Product';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { payload },
        } = req;

        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'POST') {
            throw new Error('Request method must be POST');
        }
        if (!payload) {
            throw new Error('Missing required fields: payload');
        }

        await connectDb();

        const product = await Product.create(payload);

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
