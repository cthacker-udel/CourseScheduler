import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

/**
 * The main document element, which allows for configuration to the root DOM element
 *
 * @returns The main document, with customization features
 */
const Document = (): JSX.Element => (
    <Html lang="en">
        <Head>
            <link
                crossOrigin="anonymous"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                rel="stylesheet"
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
