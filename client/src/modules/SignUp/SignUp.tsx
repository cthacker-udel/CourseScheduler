import {
    faEnvelope,
    faEye,
    faEyeSlash,
    faKey,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form, InputGroup, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import type { ApiError, ApiSuccess, SignUpRequest } from "src/@types";
import { UsersApi } from "src/api/client-side/UsersApi";
import { EMAIL, USERNAME } from "src/common";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";
import { generateTooltipIntl, validatePassword } from "src/helpers";
import { Logger } from "src/log/Logger";

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
    const { addNotification } = useNotificationContext();
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

    const intl = useIntl();
    const userNameWatch = watch("username");
    const passwordWatch = watch("password");
    const confirmPasswordWatch = watch("confirmPassword");
    const emailWatch = watch("email");
    const { errors, isValid, isValidating } = formState;

    React.useEffect(() => {
        /**
         * Prefetches routes for quicker page loading
         */
        const preFetchRoutes = async (): Promise<void> => {
            await router.prefetch("/login");
        };
        preFetchRoutes()
            .then(() => {
                Logger.log("info", "routes prefetched");
            })
            .catch((error) => {
                Logger.log("error", error);
            });
    }, [router]);

    /**
     * Signs a user up in the database, or returns an error.
     *
     * @param request The data used to sign a user up in the database
     */
    const signUp = async (request: SignUpRequest): Promise<void> => {
        if (!request.email || !request.password || !request.username) {
            return;
        }
        const result = await UsersApi.signUp(request);
        reset();
        if ((result as ApiError).errorCode) {
            const convertedError = result as ApiError;
            switch (convertedError.errorCode) {
                case CONSTANTS.SIGN_UP_ERROR_CODES.EMAIL: {
                    addNotification({
                        message: {
                            body: "Email already exists",
                            header: "Email error",
                        },
                        variant: "error",
                    });
                    break;
                }
                case CONSTANTS.SIGN_UP_ERROR_CODES.USER: {
                    addNotification({
                        message: {
                            body: "User already exists",
                            header: "User error",
                        },
                        variant: "error",
                    });
                    break;
                }
                default: {
                    addNotification({
                        message: {
                            body: "An error occurred, please try again",
                            header: "User error",
                        },
                        variant: "error",
                    });
                    break;
                }
            }
        } else {
            addNotification({
                message: {
                    body: "Sign up complete",
                    header: "Sign up completed, redirecting you to the login page.",
                },
                variant: "success",
            });
            setTimeout(async () => {
                await router.push("/login");
            }, CONSTANTS.SIGN_UP_REDIRECT_TIMEOUT);
        }
    };

    /**
     * This function aids in the validation of the password, following a step-by-step algorithm to determine if the password is valid
     * @param password The password the user is attempting to enter into the sign up form
     */
    const validatePass = (password: string): boolean | string => {
        const MIN_PASSWORD_REQUIRE = 1;
        const matches = validatePassword(password);
        if (
            matches.lowercaseMatch &&
            matches.uppercaseMatch &&
            matches.symbolMatch
        ) {
            return true;
        }
        if (!matches.lowercaseMatch) {
            return intl.formatMessage(
                { id: "sign_up_form_password_lower" },
                { amt: MIN_PASSWORD_REQUIRE },
            );
        }
        if (!matches.uppercaseMatch) {
            return intl.formatMessage(
                { id: "sign_up_form_password_upper" },
                { amt: MIN_PASSWORD_REQUIRE },
            );
        }
        if (!matches.symbolMatch) {
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
        <div
            className={`h-100 text-center justify-content-center d-flex flex-row align-items-center ${styles.sign_up_card}`}
        >
            <div className="w-75 border border-secondary mx-auto d-flex flex-column justify-content-between">
                <span
                    className={`fw-bolder fs-4 text-decoration-underline bg-light py-1 ${styles.header_text}`}
                >
                    <FormattedMessage id="sign_up_form_title" />
                </span>
                <div className="d-flex flex-column justify-content-around py-3">
                    <div className="w-50 mx-auto">
                        <span className="d-flex flex-column pt-1">
                            <InputGroup hasValidation>
                                <InputGroup.Text className="shadow">
                                    <label htmlFor="sign-up-form">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </label>
                                </InputGroup.Text>
                                <Form.Control
                                    autoComplete="off"
                                    className="shadow"
                                    id="sign-up-form"
                                    isInvalid={!!errors.email}
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
                                                {
                                                    id: "sign_up_form0_max_length",
                                                },
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
                                            const registeredEmail =
                                                email.target.value;
                                            setValue("email", registeredEmail);
                                            if (
                                                !errors.email &&
                                                registeredEmail
                                            ) {
                                                const result =
                                                    await UsersApi.checkEmail({
                                                        email: registeredEmail,
                                                    });
                                                if (
                                                    (result as ApiSuccess)
                                                        .status ===
                                                    CONSTANTS.SIGN_UP_EMAIL_ERROR_STATUS
                                                ) {
                                                    setError("email", {
                                                        message:
                                                            intl.formatMessage({
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
                            </InputGroup>
                        </span>
                    </div>
                    <div className="w-50 pt-3 mx-auto">
                        <span className="pt-2 d-flex flex-column">
                            <InputGroup hasValidation>
                                <InputGroup.Text className="shadow">
                                    <label htmlFor="username-form">
                                        <FontAwesomeIcon icon={faUser} />
                                    </label>
                                </InputGroup.Text>
                                <Form.Control
                                    autoComplete="username"
                                    className="shadow"
                                    id="username-form"
                                    isInvalid={!!errors.username}
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
                                            setValue(
                                                "username",
                                                registeredUsername,
                                            );
                                            if (!errors.username) {
                                                const result =
                                                    await UsersApi.checkUsername(
                                                        {
                                                            username:
                                                                registeredUsername,
                                                        },
                                                    );
                                                if (
                                                    (result as ApiSuccess)
                                                        .status ===
                                                    CONSTANTS.SIGN_UP_USERNAME_ERROR_STATUS
                                                ) {
                                                    setError("username", {
                                                        message:
                                                            intl.formatMessage({
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
                            </InputGroup>
                        </span>
                    </div>
                    <div className="w-50 pt-3 mx-auto">
                        <span className="d-flex flex-row pt-1">
                            <span className="w-100">
                                <InputGroup hasValidation>
                                    <InputGroup.Text className="shadow">
                                        <label htmlFor="password-form">
                                            <FontAwesomeIcon icon={faKey} />
                                        </label>
                                    </InputGroup.Text>
                                    <Form.Control
                                        autoComplete="new-password"
                                        className="shadow"
                                        id="password-form"
                                        isInvalid={!!errors.password}
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
                                            onChange: async (
                                                event: React.ChangeEvent<HTMLInputElement>,
                                            ) => {
                                                setValue(
                                                    "password",
                                                    event.target.value,
                                                );
                                                await trigger(
                                                    "confirmPassword",
                                                );
                                            },
                                            required: {
                                                message: intl.formatMessage({
                                                    id: "sign_up_form_password_required",
                                                }),
                                                value: true,
                                            },
                                            validate: (pass: string) =>
                                                validatePass(pass),
                                        })}
                                        placeholder={intl.formatMessage({
                                            id: "sign_up_form2_placeholder",
                                        })}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                    />
                                    {errors.password && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password.message}
                                        </Form.Control.Feedback>
                                    )}
                                </InputGroup>
                            </span>
                            <OverlayTrigger
                                overlay={(properties): JSX.Element =>
                                    generateTooltipIntl("tooltip", properties, {
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
                        </span>
                    </div>
                    <div className="w-50 pt-3 mx-auto">
                        <InputGroup hasValidation>
                            <InputGroup.Text className="shadow">
                                <label htmlFor="confirm-password-form">
                                    <FontAwesomeIcon icon={faKey} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="confirm-password"
                                className="shadow"
                                id="confirm-password-form"
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
                                            {
                                                amt: CONSTANTS.PASSWORD_MAX_LENGTH,
                                            },
                                        ),
                                        value: CONSTANTS.PASSWORD_MAX_LENGTH,
                                    },
                                    minLength: {
                                        message: intl.formatMessage(
                                            {
                                                id: "sign_up_form_confirm_password_min_length",
                                            },
                                            {
                                                amt: CONSTANTS.PASSWORD_MIN_LENGTH,
                                            },
                                        ),
                                        value: CONSTANTS.PASSWORD_MIN_LENGTH,
                                    },
                                    required: {
                                        message: intl.formatMessage({
                                            id: "sign_up_form_confirm_password_required",
                                        }),
                                        value: true,
                                    },
                                    validate: (confirmPassword: string) =>
                                        confirmPassword === watch().password ||
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
                        </InputGroup>
                    </div>
                    <Button
                        className={`${styles.sign_up_button} mx-auto mt-3`}
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
                        }`}
                    >
                        <FormattedMessage id="sign_up_form_submit_button" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
