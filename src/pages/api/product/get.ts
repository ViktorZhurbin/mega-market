import { NextApiResponse, NextApiRequest } from 'next';

import { connectDb } from '../../../utils/initDb';
import { Product } from '@/models/Product';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method } = req;
        await connectDb();

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
