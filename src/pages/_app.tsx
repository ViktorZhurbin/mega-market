import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
