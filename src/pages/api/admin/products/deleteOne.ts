import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { ProductModel } from '@/modules/product/models';
import { dbConnect } from '@/utils/api/db';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const {
            method,
            body: { id },
        } = req;
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'DELETE') {
            throw new Error('Request method must be DELETE');
        }

        if (!id) {
            throw new Error('Missing field: id');
        }
        await dbConnect();

        const product = await ProductModel.deleteOne({ _id: id });

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
