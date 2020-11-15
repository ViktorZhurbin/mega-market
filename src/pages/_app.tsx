import '../styles/global.css';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';

import { CartProvider } from '@/contexts';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            <Provider session={pageProps.session}>
                <CartProvider>
                    <Component {...pageProps} />
                </CartProvider>
            </Provider>
        </>
    );
}
