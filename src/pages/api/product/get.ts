import { NextApiResponse, NextApiRequest } from 'next';

import { dbConnect } from '@src/utils/db/initDb';
import { Product } from '@src/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, body = {} } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        await dbConnect();
        const products = await Product.find(body);

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
