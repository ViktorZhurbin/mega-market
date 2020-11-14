import '../styles/global.css';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
