/* eslint-disable no-undefined -- disabled to use react-hook-form properly */
import React from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import loginFormDetails from "src/locale/en/login.json";

import styles from "./LoginPage.module.css";

/**
 * @summary Login Page component
 * @returns {JSX.Element} The Login Page component
 */
export const LoginPage = (): JSX.Element => {
    useForm({
        context: undefined,
        criteriaMode: "all",
        defaultValues: {},
        delayError: undefined,
        mode: "all",
        reValidateMode: "onChange",
        resolver: undefined,
        shouldFocusError: false,
    });
    return (
        <Container className="mt-4 d-flex flex-column justify-content-center text-center">
            <div className="mt-4 mb-4">
                <Card>
                    <Card.Body>
                        <Card.Title className="m-4">
                            <h3
                                className={`font-weight-bold text-wrap ${styles.login_header}`}
                            >
                                <FormattedMessage id="login_header" />
                            </h3>
                            <div className="border border-secondary opacity-50 shadow-lg w-50 mx-auto mt-5 mb-5" />
                            <div
                                className={`w-75 mx-auto p-3 ${styles.login_description}`}
                            >
                                <FormattedMessage id="login_sub_header" />
                            </div>
                        </Card.Title>
                        <div className="border border-secondary opacity-50 shadow-lg w-50 mx-auto mt-5 mb-5" />
                        <h2 className="text-decoration-underline mb-4">
                            <FormattedMessage id="login_form_title" />
                        </h2>
                        <Card>
                            <Form>
                                <Form.Group controlId="password-form">
                                    <Form.Label className="text-start fw-bolder text-wrap w-100 m-2">
                                        {loginFormDetails.password_form1_label}
                                    </Form.Label>
                                    <Form.Control
                                        className="m-2 p-2 w-50 mr-auto"
                                        placeholder={
                                            loginFormDetails.login_email_placeholder
                                        }
                                        type="email"
                                    />
                                    <div
                                        className="text-start w-100 m-2 text-muted"
                                        id="email_help_block"
                                    >
                                        {loginFormDetails.email_form_help_text}{" "}
                                        <Link to="forgot/email">
                                            {loginFormDetails.email_forgot_text}
                                        </Link>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};
