import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import { AppContextProvider } from '../contexts';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            <Provider session={pageProps.session}>
                <AppContextProvider>
                    <Component {...pageProps} />
                </AppContextProvider>
            </Provider>
        </>
    );
}
