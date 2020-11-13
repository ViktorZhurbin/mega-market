import { NextApiResponse, NextApiRequest } from 'next';

import { dbConnect } from '@src/utils/api/db';
import { ProductModel } from '@product/models';

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

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
