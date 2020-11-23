import { NextApiResponse } from 'next';

import { UserApiRequest, withUser } from '@/utils/api/middleware';

const handler = async (
    req: UserApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { method, user } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default withUser(handler);
