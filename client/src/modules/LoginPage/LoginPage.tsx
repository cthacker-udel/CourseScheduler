/* eslint-disable max-lines-per-function -- major file, integral part of application should not be limited by line length */
/* eslint-disable no-undefined -- disabled to use react-hook-form properly */
import {
    faEnvelope,
    faEye,
    faEyeSlash,
    faKey,
    faSignIn,
    faUser,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type ReactNode } from "react";
import { Button, Form, InputGroup, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import type { LoginRequest, LoginResponse } from "src/@types";
import { UsersApi } from "src/api/client-side/UsersApi";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";
import { generateTooltip } from "src/helpers";
import loginFormDetails from "src/locale/en/login.json";
import { LoginPageReducer } from "src/reducer";

/**
 * @summary Login Page component
 * @returns {JSX.Element} The Login Page component
 */
export const LoginPage = (): JSX.Element => {
    const [state, dispatch] = React.useReducer(LoginPageReducer, {}, () => ({
        showPassword: false,
    }));
    const { addNotification } = useNotificationContext();
    const router = useRouter();
    const { formState, register, reset, watch } = useForm({
        context: undefined,
        criteriaMode: "all",
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
        delayError: undefined,
        mode: "all",
        reValidateMode: "onChange",
        resolver: undefined,
        shouldFocusError: false,
    });

    const { dirtyFields } = formState;

    /**
     * Handles login logic in regards to the component state
     *
     * @param data The login request, containing the username, password, and email of the user
     */
    const validateLogin = async (data: LoginRequest): Promise<void> => {
        const result: LoginResponse = await UsersApi.login(data);
        if (result.canLogin) {
            reset();
            await router.push("/dashboard");
        } else {
            addNotification({
                message: { body: "Login failed" },
                variant: "danger",
            });
        }
    };

    return (
        <div className="text-center h-100 d-flex flex-column justify-content-around">
            <span>
                <h3 className="pt-4">
                    <FormattedMessage id="login_header" />
                </h3>
                <div className="border border-secondary opacity-50 shadow-lg w-50 mx-auto my-3" />
                <div>
                    <FormattedMessage id="login_sub_header" />
                </div>
                <div className="border border-secondary opacity-50 shadow-lg w-50 mx-auto my-3" />
            </span>
            <span>
                <div className="border border-secondary border-opacity-50 shadow-lg w-75 pb-4 pt-2 mx-auto">
                    <h2 className="pt-3">
                        <FormattedMessage id="login_form_title" />
                    </h2>
                    <div className="w-50 mx-auto pt-3">
                        <InputGroup>
                            <InputGroup.Text>
                                <label htmlFor="username_login_form_component">
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="username"
                                id="username_login_form_component"
                                {...register("username")}
                                placeholder={
                                    loginFormDetails.login_username_placeholder
                                }
                                type="text"
                            />
                        </InputGroup>
                        <div
                            className="pt-1 text-start"
                            id="username_help_block"
                        >
                            {loginFormDetails.login_username_help_text}{" "}
                            <Link href="/forgot/username" passHref>
                                <a className="text-decoration-none">
                                    {
                                        loginFormDetails.login_username_forgot_text
                                    }
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="w-50 mx-auto pt-3">
                        <InputGroup>
                            <InputGroup.Text>
                                <label htmlFor="email_login_form_component">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="email"
                                id="email_login_form_component"
                                {...register("email")}
                                placeholder={
                                    loginFormDetails.login_email_placeholder
                                }
                                type="email"
                            />
                        </InputGroup>
                        <div className="pt-1 text-start" id="email_help_block">
                            {loginFormDetails.email_form_help_text}{" "}
                            <Link href="/forgot/email" passHref>
                                <a className="text-decoration-none">
                                    {loginFormDetails.email_forgot_text}
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="w-50 mx-auto pt-3">
                        <InputGroup>
                            <InputGroup.Text>
                                <label htmlFor="password_login_form_component">
                                    <FontAwesomeIcon icon={faKey} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="current-password"
                                id="password_login_form_component"
                                {...register("password")}
                                placeholder={
                                    loginFormDetails.password_form_placeholder
                                }
                                type={state.showPassword ? "text" : "password"}
                            />
                            <OverlayTrigger
                                delay={{ hide: 100, show: 100 }}
                                overlay={(
                                    injected: OverlayInjectedProps,
                                ): ReactNode =>
                                    generateTooltip(
                                        state.showPassword
                                            ? loginFormDetails.password_form_hide
                                            : loginFormDetails.password_form_show,
                                        injected,
                                    )
                                }
                                placement="right"
                            >
                                <Button
                                    id="show_password_button"
                                    onClick={(): void => {
                                        dispatch({
                                            payload: { ...state },
                                            type: "setShowPassword",
                                        });
                                    }}
                                    variant={
                                        state.showPassword
                                            ? "outline-danger"
                                            : "outline-success"
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            state.showPassword
                                                ? faEyeSlash
                                                : faEye
                                        }
                                    />
                                </Button>
                            </OverlayTrigger>
                        </InputGroup>
                        <div
                            className="pt-1 text-start"
                            id="password_help_block"
                        >
                            {loginFormDetails.password_form_help_text}{" "}
                            <Link href="/forgot/password" passHref>
                                <a className="text-decoration-none">
                                    {loginFormDetails.password_forgot_text}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </span>
            <div className="w-25 mx-auto pb-3">
                <OverlayTrigger
                    delay={{ hide: 100, show: 100 }}
                    overlay={(properties: OverlayInjectedProps): ReactNode =>
                        generateTooltip(loginFormDetails.login, properties)
                    }
                    placement="left"
                >
                    <Button
                        className="me-2"
                        disabled={
                            dirtyFields.email === undefined ||
                            dirtyFields.password === undefined
                        }
                        onClick={async (): Promise<void> => {
                            await validateLogin(watch());
                        }}
                        title="Login"
                        variant="outline-primary"
                    >
                        <FontAwesomeIcon icon={faSignIn} />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    delay={{ hide: 100, show: 100 }}
                    overlay={(properties: OverlayInjectedProps): ReactNode =>
                        generateTooltip(loginFormDetails.sign_up, properties)
                    }
                    placement="right"
                >
                    <Button
                        className="ms-2"
                        onClick={async (): Promise<void> => {
                            await router.push("/sign-up");
                        }}
                        title="Sign Up"
                        variant="outline-info"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
};
