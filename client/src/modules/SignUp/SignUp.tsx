import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { Alert, Button, Card, Form, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import type { ApiError, ApiSuccess, SignUpRequest } from "src/@types";
import type { ApiMessage } from "src/api/ApiMessage/ApiMessage";
import { UsersApi } from "src/api/client-side/UsersApi";
import { EMAIL, USERNAME } from "src/common";
import { generateTooltipIntl } from "src/helpers";

import styles from "./SignUp.module.css";

/**
 * Type of the data that will be utilized within the sign up form
 */
type FormData = {
    confirmPassword: string;
    email: string;
    password: string;
    username: string;
};

/**
 * Constants for the SignUp component
 */
const CONSTANTS = {
    /**
     * Password max length
     */
    PASSWORD_MAX_LENGTH: 30,
    /**
     * Password min length
     */
    PASSWORD_MIN_LENGTH: 7,
    /**
     * The default sign up timeout
     */
    SIGN_UP_ALERT_TIMEOUT: 5000,
    /**
     * Sign up email error http status
     */
    SIGN_UP_EMAIL_ERROR_STATUS: 200,
    /**
     * Error codes that concern the sign up flow
     */
    SIGN_UP_ERROR_CODES: {
        EMAIL: 2,
        USER: 1,
    },
    /**
     * The default time to wait until redirecting the user
     */
    SIGN_UP_REDIRECT_TIMEOUT: 2500,
    /**
     * Sign up username error http status
     */
    SIGN_UP_USERNAME_ERROR_STATUS: 200,
    /**
     * General text field min length
     */
    TEXT_FIELD_MIN_LENGTH: 1,
};

/**
 * Sign-Up Page component, will communicate with back-end to sign user up and insert record into mongo database
 */
export const SignUp = (): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { formState, register, reset, setError, setValue, trigger, watch } =
        useForm<FormData>({
            defaultValues: {
                confirmPassword: "",
                email: "",
                password: "",
                username: "",
            },
            mode: "all",
            reValidateMode: "onChange",
        });
    const router = useRouter();
    const [apiError, setApiError] = React.useState<ApiMessage>();
    const [apiSuccess, setApiSuccess] = React.useState<ApiMessage>();

    const intl = useIntl();
    const userNameWatch = watch("username");
    const passwordWatch = watch("password");
    const confirmPasswordWatch = watch("confirmPassword");
    const emailWatch = watch("email");
    const { errors, isValid, isValidating } = formState;

    /**
     * Updates the error message for the front end to display
     *
     * @param message The error message to display
     */
    const updateError = (message: string): void => {
        setApiError({ message });
        setTimeout(() => {
            setApiError(undefined);
        }, CONSTANTS.SIGN_UP_ALERT_TIMEOUT);
    };

    /**
     * Updates the success message for the front end to display
     *
     * @param message The success message to display
     */
    const updateSuccess = (message: string): void => {
        setApiSuccess({ message });
        setTimeout(() => {
            setApiSuccess(undefined);
        }, CONSTANTS.SIGN_UP_ALERT_TIMEOUT);
    };

    /**
     * Signs a user up in the database, or returns an error.
     *
     * @param request The data used to sign a user up in the database
     */
    const signUp = async (request: SignUpRequest): Promise<void> => {
        const result = await UsersApi.signUp(request);
        reset();
        if ((result as ApiError).errorCode) {
            const convertedError = result as ApiError;
            switch (convertedError.errorCode) {
                case CONSTANTS.SIGN_UP_ERROR_CODES.EMAIL: {
                    updateError("Email already exists");
                    break;
                }
                case CONSTANTS.SIGN_UP_ERROR_CODES.USER: {
                    updateError("User already exists");
                    break;
                }
                default: {
                    updateError("An error occurred, please try again");
                    break;
                }
            }
        } else {
            updateSuccess("Sign up complete");
            setTimeout(async () => {
                await router.push("/login");
            }, CONSTANTS.SIGN_UP_REDIRECT_TIMEOUT);
        }
    };

    /**
     * This function aids in the validation of the password, following a step-by-step algorithm to determine if the password is valid
     * @param password The password the user is attempting to enter into the sign up form
     */
    const validatePassword = (password: string): boolean | string => {
        const MIN_PASSWORD_REQUIRE = 1;
        const lowercaseMatch = password.match(/[a-z]/gu);
        const uppercaseMatch = password.match(/[A-Z]/gu);
        const symbolMatch = password.match(/[\W]/gu);
        if (lowercaseMatch && uppercaseMatch && symbolMatch) {
            return true;
        }
        if (!lowercaseMatch) {
            return intl.formatMessage(
                { id: "sign_up_form_password_lower" },
                { amt: MIN_PASSWORD_REQUIRE },
            );
        }
        if (!uppercaseMatch) {
            return intl.formatMessage(
                { id: "sign_up_form_password_upper" },
                { amt: MIN_PASSWORD_REQUIRE },
            );
        }
        if (!symbolMatch) {
            return intl.formatMessage(
                { id: "sign_up_form_password_symbol" },
                { amt: MIN_PASSWORD_REQUIRE },
            );
        }
        return "Server Error";
    };

    /**
     * This function determines whether the submit button should be disabled
     * @returns If the submit button should be disabled
     */
    const isSubmitButtonDisabled = (): boolean =>
        userNameWatch.length < CONSTANTS.TEXT_FIELD_MIN_LENGTH ||
        passwordWatch.length < CONSTANTS.TEXT_FIELD_MIN_LENGTH ||
        confirmPasswordWatch.length < CONSTANTS.TEXT_FIELD_MIN_LENGTH ||
        !isValid ||
        isValidating;

    return (
        <Card
            className={`text-center mx-auto w-50 text-wrap mt-5 pb-2 pr-2 pl-2 ${styles.sign_up_card}`}
        >
            {apiError?.message && (
                <Alert variant="error">{apiError.message}</Alert>
            )}
            {apiSuccess?.message && (
                <Alert variant="success">{apiSuccess.message}</Alert>
            )}
            <Card.Header className="fw-bold fs-4">
                <span className={`${styles.header_text}`}>
                    <FormattedMessage id="sign_up_form_title" />
                </span>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="w-50 mx-auto mt-4 mb-3">
                        <Form.Label className="fw-bold mb-2 fs-5">
                            <FormattedMessage id="sign_up_form0_title" />
                        </Form.Label>
                        <Form.Control
                            autoComplete="off"
                            isInvalid={errors.email && true}
                            isValid={
                                !errors.email &&
                                emailWatch.length >=
                                    CONSTANTS.TEXT_FIELD_MIN_LENGTH
                            }
                            placeholder={intl.formatMessage({
                                id: "sign_up_form0_placeholder",
                            })}
                            required
                            type="email"
                            {...register("email", {
                                maxLength: {
                                    message: intl.formatMessage(
                                        { id: "sign_up_form0_max_length" },
                                        { length: 50 },
                                    ),
                                    value: 50,
                                },
                                minLength: {
                                    message: intl.formatMessage(
                                        {
                                            id: "sign_up_form0_min_length",
                                        },
                                        { length: 1 },
                                    ),
                                    value: 1,
                                },
                                onBlur: async (
                                    email: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    await trigger("email");
                                    const registeredEmail = email.target.value;
                                    setValue("email", registeredEmail);
                                    if (!errors.email) {
                                        const result =
                                            await UsersApi.checkEmail({
                                                email: registeredEmail,
                                            });
                                        if (
                                            (result as ApiSuccess).status ===
                                            CONSTANTS.SIGN_UP_EMAIL_ERROR_STATUS
                                        ) {
                                            setError("email", {
                                                message: intl.formatMessage({
                                                    id: "sign_up_form_email_exists",
                                                }),
                                                type: "validate",
                                            });
                                        }
                                    }
                                },
                                pattern: {
                                    message: intl.formatMessage({
                                        id: "sign_up_form0_validation_error",
                                    }),
                                    value: EMAIL,
                                },
                                required: {
                                    message: intl.formatMessage({
                                        id: "sign_up_form0_required",
                                    }),
                                    value: true,
                                },
                            })}
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">
                                {errors.email.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group
                        className={`w-50 mx-auto mt-4 mb-3 ${styles.username_form}`}
                        controlId="username-sign-up-form"
                    >
                        <Form.Label className="fw-bold mb-2 fs-5">
                            <FormattedMessage id="sign_up_form1_title" />
                        </Form.Label>
                        <Form.Control
                            autoComplete="username"
                            isInvalid={errors.username && true}
                            isValid={
                                !errors.username &&
                                userNameWatch.length >=
                                    CONSTANTS.TEXT_FIELD_MIN_LENGTH
                            }
                            placeholder={intl.formatMessage({
                                id: "sign_up_form1_placeholder",
                            })}
                            required
                            type="text"
                            {...register("username", {
                                maxLength: {
                                    message: intl.formatMessage(
                                        {
                                            id: "sign_up_form1_input_error_max_length",
                                        },
                                        { length: 20 },
                                    ),
                                    value: 20,
                                },
                                onBlur: async (
                                    username: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    await trigger("username");
                                    const registeredUsername =
                                        username.target.value;
                                    setValue("username", registeredUsername);
                                    if (!errors.username) {
                                        const result =
                                            await UsersApi.checkUsername({
                                                username: registeredUsername,
                                            });
                                        if (
                                            (result as ApiSuccess).status ===
                                            CONSTANTS.SIGN_UP_USERNAME_ERROR_STATUS
                                        ) {
                                            setError("username", {
                                                message: intl.formatMessage({
                                                    id: "sign_up_form_username_exists",
                                                }),
                                                type: "validate",
                                            });
                                        }
                                    }
                                },
                                pattern: {
                                    message: "Cannot contain symbols",
                                    value: USERNAME,
                                },
                                required: intl.formatMessage({
                                    id: "sign_up_form1_input_error_required",
                                }),
                            })}
                        />
                        {errors.username && (
                            <Form.Control.Feedback type="invalid">
                                {errors.username.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className={`mt-5 ${styles.password_form}`}>
                        <Form.Label>
                            <span className="fs-5 fw-bold">
                                <FormattedMessage id="sign_up_form2_label" />
                            </span>
                        </Form.Label>
                        <div className="mx-auto w-50 d-flex flex-row justify-content-around">
                            <span className="w-100">
                                <Form.Control
                                    autoComplete="new-password"
                                    isInvalid={errors.password && true}
                                    isValid={
                                        !errors.password &&
                                        passwordWatch.length >=
                                            CONSTANTS.TEXT_FIELD_MIN_LENGTH
                                    }
                                    {...register("password", {
                                        maxLength: {
                                            message: intl.formatMessage(
                                                {
                                                    id: "sign_up_form_password_max_length",
                                                },
                                                {
                                                    length: CONSTANTS.PASSWORD_MAX_LENGTH,
                                                },
                                            ),
                                            value: CONSTANTS.PASSWORD_MAX_LENGTH,
                                        },
                                        minLength: {
                                            message: intl.formatMessage(
                                                {
                                                    id: "sign_up_form_password_min_length",
                                                },
                                                {
                                                    length: CONSTANTS.PASSWORD_MIN_LENGTH,
                                                },
                                            ),
                                            value: CONSTANTS.PASSWORD_MIN_LENGTH,
                                        },
                                        required: {
                                            message: intl.formatMessage({
                                                id: "sign_up_form_password_required",
                                            }),
                                            value: true,
                                        },
                                        validate: (pass: string) =>
                                            validatePassword(pass),
                                    })}
                                    placeholder={intl.formatMessage({
                                        id: "sign_up_form2_placeholder",
                                    })}
                                    type={showPassword ? "text" : "password"}
                                />
                                {errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password.message}
                                    </Form.Control.Feedback>
                                )}
                            </span>
                            <OverlayTrigger
                                overlay={(props): JSX.Element =>
                                    generateTooltipIntl("tooltip", props, {
                                        type: showPassword
                                            ? "Hide Password"
                                            : "Show Password",
                                    })
                                }
                                placement="right"
                            >
                                <Button
                                    className="ms-3 h-50"
                                    onClick={(): void => {
                                        setShowPassword(
                                            (oldValue) => !oldValue,
                                        );
                                    }}
                                    variant={
                                        showPassword
                                            ? "outline-success"
                                            : "outline-warning"
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Form.Group>
                    <Form.Group
                        className={`mt-5 mb-3 mx-auto w-50 ${styles.confirm_password_form}`}
                    >
                        <Form.Label className="fs-5 fw-bold">
                            <FormattedMessage id="sign_up_form3_label" />
                        </Form.Label>
                        <Form.Control
                            autoComplete="confirm-password"
                            isInvalid={
                                errors.confirmPassword &&
                                confirmPasswordWatch.length >=
                                    CONSTANTS.TEXT_FIELD_MIN_LENGTH
                            }
                            isValid={
                                !errors.confirmPassword &&
                                confirmPasswordWatch.length >=
                                    CONSTANTS.TEXT_FIELD_MIN_LENGTH
                            }
                            placeholder={intl.formatMessage({
                                id: "sign_up_form3_placeholder",
                            })}
                            type="password"
                            {...register("confirmPassword", {
                                maxLength: {
                                    message: intl.formatMessage(
                                        {
                                            id: "sign_up_form_confirm_password_max_length",
                                        },
                                        { amt: CONSTANTS.PASSWORD_MAX_LENGTH },
                                    ),
                                    value: CONSTANTS.PASSWORD_MAX_LENGTH,
                                },
                                minLength: {
                                    message: intl.formatMessage(
                                        {
                                            id: "sign_up_form_confirm_password_min_length",
                                        },
                                        { amt: CONSTANTS.PASSWORD_MIN_LENGTH },
                                    ),
                                    value: CONSTANTS.PASSWORD_MIN_LENGTH,
                                },
                                required: {
                                    message: intl.formatMessage({
                                        id: "sign_up_form_confirm_password_required",
                                    }),
                                    value: true,
                                },
                                validate: (confirmPass: string) =>
                                    confirmPass === passwordWatch ||
                                    intl.formatMessage({
                                        id: "sign_up_form_confirm_password_not_matching",
                                    }),
                            })}
                        />
                        {errors.confirmPassword && (
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Form>
                <Button
                    className={styles.sign_up_button}
                    disabled={isSubmitButtonDisabled()}
                    onClick={async (): Promise<void> => {
                        await signUp({
                            email: emailWatch,
                            password: passwordWatch,
                            username: userNameWatch,
                        });
                    }}
                    variant={`outline-${
                        isSubmitButtonDisabled() ? "secondary" : "success"
                    } mt-4 mx-auto`}
                >
                    <FormattedMessage id="sign_up_form_submit_button" />
                </Button>
            </Card.Body>
        </Card>
    );
};
