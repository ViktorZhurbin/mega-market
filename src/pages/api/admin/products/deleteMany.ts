import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { Product } from '@src/models';
import { dbConnect } from '@src/utils/db/initDb';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, body: filter } = req;
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            throw new Error('Unauthorized');
        }

        if (method !== 'DELETE') {
            throw new Error('Request method must be DELETE');
        }

        await dbConnect();

        const { deletedCount } = await Product.deleteMany(filter);

        res.status(200).json({
            success: true,
            data: `Deleted ${deletedCount} products`,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
