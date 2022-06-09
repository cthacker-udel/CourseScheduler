/* eslint-disable max-lines-per-function -- major file, intergral part of application should not be limited by line length */
/* eslint-disable no-undefined -- disabled to use react-hook-form properly */
import {
    faEnvelope,
    faEye,
    faEyeSlash,
    faKey,
    faSignIn,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
    Button,
    Card,
    Container,
    Form,
    InputGroup,
    Overlay,
    Tooltip,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import loginFormDetails from "src/locale/en/login.json";

import styles from "./LoginPage.module.css";

/**
 * Interface for managing the state of overlays
 */
interface LoginPageState {
    showPasswordOverlay: boolean;
    showLoginOverlay: boolean;
    showSignUpOverlay: boolean;
    showPassword: boolean;
}

/**
 * Types of actions the user can make
 */
type LoginPageReducerActionType =
    | "setLoginOverlay"
    | "setPasswordOverlay"
    | "setShowPassword"
    | "setSignUpOverlay";

/**
 * Action that will be utilized in the reducer
 */
interface LoginPageReducerAction {
    type: LoginPageReducerActionType;
    payload: LoginPageState;
}

/**
 *
 * @param state The current state of the application
 * @param action The action the user is taking, along with any updates to state they want to make
 * @returns The updated state
 */
const LoginPageReducer = (
    state: LoginPageState,
    action: LoginPageReducerAction,
): LoginPageState => {
    switch (action.type) {
        case "setLoginOverlay": {
            return {
                ...state,
                showLoginOverlay: action.payload.showLoginOverlay,
            };
        }
        case "setPasswordOverlay": {
            return {
                ...state,
                showPasswordOverlay: action.payload.showPasswordOverlay,
            };
        }
        case "setSignUpOverlay": {
            return {
                ...state,
                showSignUpOverlay: action.payload.showSignUpOverlay,
            };
        }
        case "setShowPassword": {
            return {
                ...state,
                showPassword: !state.showPassword,
            };
        }
        default: {
            return { ...state };
        }
    }
};

/**
 * @summary Login Page component
 * @returns {JSX.Element} The Login Page component
 */
export const LoginPage = (): JSX.Element => {
    const [state, dispatch] = React.useReducer(LoginPageReducer, {}, () => ({
        showLoginOverlay: false,
        showPassword: false,
        showPasswordOverlay: false,
        showSignUpOverlay: false,
    }));
    const showPasswordRef = React.useRef(null);
    const loginRef = React.useRef(null);
    const signUpRef = React.useRef(null);
    const { register, formState } = useForm({
        context: undefined,
        criteriaMode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
        delayError: undefined,
        mode: "all",
        reValidateMode: "onChange",
        resolver: undefined,
        shouldFocusError: false,
    });

    const { dirtyFields } = formState;

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
                                            {...register("email")}
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
                                            {...register("password")}
                                            placeholder={
                                                loginFormDetails.password_form_placeholder
                                            }
                                            type={
                                                state.showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />
                                        <Button
                                            id="show_password_button"
                                            onClick={(): void => {
                                                dispatch({
                                                    payload: { ...state },
                                                    type: "setShowPassword",
                                                });
                                            }}
                                            onMouseEnter={(): void => {
                                                dispatch({
                                                    payload: {
                                                        ...state,
                                                        showPasswordOverlay:
                                                            true,
                                                    },
                                                    type: "setPasswordOverlay",
                                                });
                                            }}
                                            onMouseLeave={(): void => {
                                                dispatch({
                                                    payload: {
                                                        ...state,
                                                        showPasswordOverlay:
                                                            false,
                                                    },
                                                    type: "setPasswordOverlay",
                                                });
                                            }}
                                            ref={showPasswordRef}
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
                                    </InputGroup>
                                    <div
                                        className="text-start w-100 m-2 text-muted"
                                        id="password_help_block"
                                    >
                                        {
                                            loginFormDetails.password_form_help_text
                                        }{" "}
                                        <Link to="forgot/password">
                                            {
                                                loginFormDetails.password_forgot_text
                                            }
                                        </Link>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Card.Body>
                    <div className="mb-4 mt-2">
                        <Link to="courses">
                            <Button
                                className="me-2"
                                disabled={
                                    dirtyFields.email === undefined ||
                                    dirtyFields.password === undefined
                                }
                                onMouseEnter={(): void => {
                                    dispatch({
                                        payload: {
                                            ...state,
                                            showLoginOverlay: true,
                                        },
                                        type: "setLoginOverlay",
                                    });
                                }}
                                onMouseLeave={(): void => {
                                    dispatch({
                                        payload: {
                                            ...state,
                                            showLoginOverlay: false,
                                        },
                                        type: "setLoginOverlay",
                                    });
                                }}
                                ref={loginRef}
                                variant="outline-primary"
                            >
                                <FontAwesomeIcon icon={faSignIn} />
                            </Button>
                        </Link>
                        <Link replace to="/sign-up">
                            <Button
                                className="ms-2"
                                onMouseEnter={(): void => {
                                    dispatch({
                                        payload: {
                                            ...state,
                                            showSignUpOverlay: true,
                                        },
                                        type: "setSignUpOverlay",
                                    });
                                }}
                                onMouseLeave={(): void => {
                                    dispatch({
                                        payload: {
                                            ...state,
                                            showSignUpOverlay: false,
                                        },
                                        type: "setSignUpOverlay",
                                    });
                                }}
                                ref={signUpRef}
                                variant="outline-info"
                            >
                                <FontAwesomeIcon icon={faUserPlus} />
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
            <Overlay
                key="password_overlay"
                placement="right"
                show={state.showPasswordOverlay}
                target={showPasswordRef.current}
            >
                {(props): JSX.Element => (
                    <Tooltip {...props}>
                        {state.showPassword
                            ? loginFormDetails.password_form_hide
                            : loginFormDetails.password_form_show}
                    </Tooltip>
                )}
            </Overlay>
            <Overlay
                key="login_overlay"
                placement="left"
                show={state.showLoginOverlay}
                target={loginRef.current}
            >
                {(props): JSX.Element => (
                    <Tooltip {...props}>{loginFormDetails.login}</Tooltip>
                )}
            </Overlay>
            <Overlay
                key="signup_overlay"
                placement="right"
                show={state.showSignUpOverlay}
                target={signUpRef.current}
            >
                {(props): JSX.Element => (
                    <Tooltip {...props}>{loginFormDetails.sign_up}</Tooltip>
                )}
            </Overlay>
        </Container>
    );
};
