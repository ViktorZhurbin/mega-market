import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

import { Button } from '@/components/Button';

import styles from './CardForm.module.css';

const CardForm: React.FC = () => {
    const [error, setError] = useState(null);
    const [isReady, setReady] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        const response = await fetch('/api/checkout/session', {
            method: 'POST',
        });

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }

        if (error) {
            console.error('[error]', error);
        }
    };

    const handleChange = (event) => {
        if (event.complete) {
            setReady(true);
        }
        setError(event.error?.message);
        if (event.error) {
            console.log('[error]', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                onChange={handleChange}
                options={{
                    style: {
                        base: {
                            color: '#32325d',
                            fontFamily: '"Source Code Pro", monospace',
                            fontSmoothing: 'antialiased',
                            fontSize: '16px',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#f91155',
                            iconColor: '#f91155',
                        },
                    },
                }}
            />
            <p className={styles.error}>{error}</p>
            <Button
                type="submit"
                className={styles.btn}
                disabled={!isReady || Boolean(error) || !stripe}
            >
                Pay
            </Button>
        </form>
    );
};

export default CardForm;
