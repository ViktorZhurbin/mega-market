import { NextApiRequest, NextApiResponse } from 'next';

import { ProductModel } from '@/modules/product/models';
import { dbConnect } from '@/utils/api/db';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, body } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        await dbConnect();

        const filter = typeof body === 'object' ? body : {};
        const products = await ProductModel.find(filter);

        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
