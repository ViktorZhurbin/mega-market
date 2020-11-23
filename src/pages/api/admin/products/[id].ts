import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { ProductModel } from '@/modules/product/models';
import { dbConnect } from '@/utils/api/db';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, body, query } = req;
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        await dbConnect();

        if (method === 'DELETE') {
            if (!query.id) {
                throw new Error('Missing required field: id');
            }
            const result = await ProductModel.deleteOne({ _id: query.id });

            res.status(200).json(result);
        }

        if (method !== 'PUT') {
            if (!body.payload) {
                throw new Error('Missing required field: payload');
            }

            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: query.id },
                body.payload,
                { new: true }
            );
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
