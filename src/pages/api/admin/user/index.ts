import { NextApiResponse } from 'next';

import { user, ApiRequest } from '@src/utils/api/middleware';

const handler = async (req: ApiRequest, res: NextApiResponse): Promise<any> => {
    try {
        const { method, user } = req;

        if (method !== 'GET') {
            throw new Error('Request method must be GET');
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default user(handler);
