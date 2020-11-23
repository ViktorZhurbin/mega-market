import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@/components/Button';
import { createCheckoutSession } from '@/modules/cart/services';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
export const CheckoutButton: React.FC = () => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        await createCheckoutSession(stripe);
    };

    return (
        <Button color="green" onClick={handleCheckout}>
            Checkout
        </Button>
    );
};
