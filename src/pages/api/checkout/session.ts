import { NextApiResponse, NextApiRequest } from 'next';

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<any> => {
    try {
        const { order } = req.body;

        if (!order) {
            throw new Error('Missing required fields: order');
        }

        const line_items = order.products.map(({ product, quantity }) => ({
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
            success_url: 'http://localhost:3000/checkout/success',
            cancel_url: 'http://localhost:3000/cart',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
