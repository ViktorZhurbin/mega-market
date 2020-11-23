import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { ProductModel } from '@/modules/product/models';
import { dbConnect } from '@/utils/api/db';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, body } = req;

        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        await dbConnect();

        if (method === 'POST') {
            if (!body?.products) {
                throw new Error('Missing required fields: products');
            }

            const products = await ProductModel.create(body.products);

            res.status(201).json(products);
        }

        if (method === 'DELETE') {
            const filter = typeof body.filter === 'object' ? body.filter : {};
            const { deletedCount } = await ProductModel.deleteMany(filter);

            res.status(200).json({
                result: `Deleted ${deletedCount} products`,
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
