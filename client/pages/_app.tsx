import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import React from "react";
import { Container } from "react-bootstrap";
import { IntlProvider } from "react-intl";
import { Layout } from "src/common";
import homeMessages from "src/locale/en/home.json";

// Override to avoid large images initially
config.autoAddCss = false;

/**
 * Application component, allows for wrapping of each page with the Layout component
 *
 * @param props The initial application props
 * @returns The customized page
 */
const ApplicationWrapper = ({
    Component,
    pageProps,
}: AppProps): JSX.Element => (
    <IntlProvider defaultLocale="en" locale="en" messages={homeMessages}>
        <Container className="vh-100 p-0" fluid>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Container>
    </IntlProvider>
);

export default ApplicationWrapper;
