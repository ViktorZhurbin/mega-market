import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { connectDb } from 'src/utils/initDb';
import { Product } from 'src/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { products },
        } = req;

        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'POST') {
            throw new Error('Request method must be POST');
        }
        if (!products) {
            throw new Error('Missing required fields: products');
        }

        await connectDb();

        const product = await Product.create(products);

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};