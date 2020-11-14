import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { dbConnect } from '@/utils/api/db';
import { ProductModel } from '~product/models';

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

        if (method !== 'PUT') {
            throw new Error('Request method must be PUT');
        }

        if (!payload) {
            throw new Error('Missing required field: payload');
        }

        await dbConnect();

        const { id: _id, title, price } = payload;
        const product = await ProductModel.findOneAndUpdate(
            { _id },
            { title, price },
            { new: true }
        );

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
