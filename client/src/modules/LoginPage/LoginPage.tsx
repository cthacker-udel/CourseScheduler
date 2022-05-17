import React from "react";
import { Container } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

/**
 * @summary Login Page component
 * @returns {JSX.Element} The Login Page component
 */
export const LoginPage = (): JSX.Element => (
    <Container>
        <div>
            <FormattedMessage id="header" />
        </div>
    </Container>
);
