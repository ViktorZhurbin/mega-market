import Document, { Html, Head, Main, NextScript } from 'next/document';

import { typography } from '../styles/typography';

class MyDocument extends Document {
    render(): React.ReactElement {
        return (
            <Html>
                <Head>
                    <style
                        id={'typography.js'}
                        dangerouslySetInnerHTML={{
                            __html: typography.toString(),
                        }}
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
