import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { dbConnect } from '@src/utils/api/db';
import { UserModel } from '@user/models';

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method } = req;
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized',
            });
            throw new Error('Unauthorized');
        }

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        await dbConnect();
        const user = await UserModel.findOne({ _id: session.userId });
        const isAdmin = user.role === 'admin';

        res.status(200).json({ success: true, data: { isAdmin } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
