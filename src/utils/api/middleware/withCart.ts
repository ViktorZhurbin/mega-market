import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { CartDocument, CartModel } from '@/modules/cart/models';
import { dbConnect } from '@/utils/api/db';

export type CartApiRequest = NextApiRequest & {
    cart: CartDocument;
};
type Handler = (req: CartApiRequest, res: NextApiResponse) => Promise<any>;

export const withCart = (handler: Handler) => async (
    req: CartApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const session = await getSession({ req });

        if (!session) {
            return;
        }

        await dbConnect();

        const fetchedCart = await CartModel.findOne({ userId: session.userId });
        const cart = fetchedCart ?? new CartModel({ userId: session.userId });

        req.cart = cart;

        return handler(req, res);
    } catch (error) {
        console.error(error);
    }
};
