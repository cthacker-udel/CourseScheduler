/* eslint-disable no-undefined -- disabled to use react-hook-form properly */
import {
    faEnvelope,
    faEye,
    faEyeSlash,
    faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
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
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
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
                        <Card>
                            <Card.Title
                                className={`mx-auto mt-4 ${styles.login_form_header}`}
                            >
                                <h2 className="text-decoration-underline p-2 mr-3 ml-3">
                                    <FormattedMessage id="login_form_title" />
                                </h2>
                            </Card.Title>
                            <Form
                                className={`w-100 ${styles.login_email_form}`}
                            >
                                <Form.Group className="mx-auto w-50 mt-4 mb-4">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <label htmlFor="email_login_form_component">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                />
                                            </label>
                                        </InputGroup.Text>
                                        <Form.Control
                                            className="p-2 w-75 mr-auto"
                                            id="email_login_form_component"
                                            placeholder={
                                                loginFormDetails.login_email_placeholder
                                            }
                                            type="email"
                                        />
                                    </InputGroup>
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
                                <Form.Group className="mx-auto w-50 mt-4 mb-4">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <label htmlFor="password_login_form_component">
                                                <FontAwesomeIcon icon={faKey} />
                                            </label>
                                        </InputGroup.Text>
                                        <Form.Control
                                            className="p-2 w-75 mr-auto"
                                            id="password_login_form_component"
                                            placeholder={
                                                loginFormDetails.password_form_placeholder
                                            }
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />
                                        <Button
                                            id="show_password_button"
                                            onClick={(): void => {
                                                setShowPassword(
                                                    (oldValue) => !oldValue,
                                                );
                                            }}
                                            variant={
                                                showPassword
                                                    ? "outline-danger"
                                                    : "outline-success"
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};
