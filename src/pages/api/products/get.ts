import { NextApiResponse, NextApiRequest } from 'next';

import { connectDb } from '@src/utils/db/initDb';
import { Product } from '@src/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        await connectDb();
        const products = await Product.find({});

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
