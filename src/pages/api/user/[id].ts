import { NextApiResponse, NextApiRequest } from 'next';

import { dbConnect } from '@src/utils/db/initDb';
import { User } from '@src/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, query } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        if (!query?.id) {
            throw new Error('Missing required query param: id');
        }

        await dbConnect();

        const user = await User.findOne({ _id: query.id });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
