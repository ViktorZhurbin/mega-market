import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';

import { dbConnect } from '@/utils/api/db';
import { UserModel, UserDocument } from '~user/models';

export type ApiRequest = NextApiRequest & { user: UserDocument };
type Handler = (req: ApiRequest, res: NextApiResponse) => Promise<any>;

export const withUser = (handler: Handler) => async (
    req: ApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const session = await getSession({ req });

        if (!session) {
            return;
        }

        await dbConnect();

        const user = await UserModel.findOne({ _id: session.userId });
        if (!user) {
            return res.status(500).send('No user found');
        }
        req.user = user;

        return handler(req, res);
    } catch (error) {
        console.error(error);
    }
};
