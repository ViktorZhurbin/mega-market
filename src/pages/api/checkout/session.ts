import { NextApiRequest, NextApiResponse } from 'next';

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { cart } = req.body;

        if (!cart) {
            throw new Error('Missing required fields: cart');
        }

        const line_items = cart.products.map(({ product, quantity }) => ({
            price_data: {
                currency: 'EUR',
                product_data: {
                    name: product.title,
                },
                unit_amount: product.price * 100,
            },
            quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/checkout/success`,
            cancel_url: `${req.headers.origin}/cart`,
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
