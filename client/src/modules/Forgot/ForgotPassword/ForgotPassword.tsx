/* eslint-disable @typescript-eslint/indent -- indenting error that is unfixable as of right now */
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UsersApi } from "src/api/client-side/UsersApi";
import { EMAIL, USERNAME } from "src/common";
import { TokenModal } from "src/modules/Tokens/TokenModal/TokenModal";

const FORGOT_PASSWORD_CONSTANTS = {
    buttonText: "Request token",
    confirmEmailPlaceholder: "Confirm email here...",
    confirmValidEmail: "Emails match",
    emailPlaceholder: "Enter email here...",
    forgotPasswordFormHeader: (
        <>
            {"Enter your"}
            <span className="fw-bold text-decoration-underline">
                {" username and email "}
            </span>
            {"here to receive a"}
            <span className="fw-bold text-decoration-underline">
                {" token, "}
            </span>
            {"which you will redeem at the "}
            <span className="fw-bold text-decoration-underline fst-italic">
                {"token redeem page "}
            </span>
            {"to retrieve your password."}
        </>
    ),
    header: "Forgot Password Form",
    usernamePlaceholder: "Enter username here...",
};

const FORGOT_PASSWORD_VALIDATION_VALUES = {
    emailMaxLength: 72,
    emailMinLength: 1,
    emailRequired: true,
    usernameMaxLength: 72,
    usernameMinLength: 1,
    usernameRequired: true,
};

const FORGOT_PASSWORD_VALIDATION_MESSAGES = {
    confirmEmailInvalidMatch: "Emails do not match.",
    emailInvalidEmail: "Email is invalid",
    emailMaxLength: `Email must be at most ${FORGOT_PASSWORD_VALIDATION_VALUES.emailMaxLength} character(s).`,
    emailMinLength: `Email be at least ${FORGOT_PASSWORD_VALIDATION_VALUES.emailMinLength} character(s)`,
    emailRequired: "Email is required",
    usernameInvalid: "Username is invalid",
    usernameMaxLength: `Username must be at most ${FORGOT_PASSWORD_VALIDATION_VALUES.usernameMaxLength} character(s).`,
    usernameMinLength: `Username must be at least ${FORGOT_PASSWORD_VALIDATION_VALUES.usernameMinLength} character(s).`,
    usernameRequired: "Username is required",
    validEmail: "Email is valid",
    validUsername: "Username is valid.",
};

/**
 * When the user forgot their password, form to retrieve a token and then enter it into a prompt to reset it
 */
export const ForgotPassword = (): JSX.Element => {
    const { formState, getValues, register, watch } = useForm({
        criteriaMode: "all",
        defaultValues: {
            confirmEmail: "",
            email: "",
            username: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const [passwordToken, setPasswordToken] = React.useState<string>();
    const [passwordTokenValidUntil, setPasswordTokenValidUntil] =
        React.useState<number>();

    const { errors, dirtyFields, isDirty, isValid, isValidating } = formState;

    return (
        <>
            <div className="h-100 d-flex flex-row justify-content-center align-items-center">
                <div className="border border-3 border-secondary rounded p-3 shadow-lg bg-light bg-gradient d-flex flex-column justify-content-around h-75">
                    <div className="mx-auto w-50 text-center fw-bold fs-4 text-wrap text-decoration-underline">
                        {FORGOT_PASSWORD_CONSTANTS.header}
                    </div>
                    <div className="p-2 mt-3 shadow bg-info bg-opacity-25 rounded text-wrap w-50 mx-auto">
                        {FORGOT_PASSWORD_CONSTANTS.forgotPasswordFormHeader}
                    </div>
                    <div className="mt-2 w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text>
                                <label
                                    className="fw-bold fs-6"
                                    htmlFor="current-email-form"
                                >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="current-email"
                                id="current-email-form"
                                isInvalid={
                                    isDirty &&
                                    dirtyFields.email &&
                                    errors.email !== undefined
                                }
                                isValid={
                                    isDirty &&
                                    dirtyFields.email &&
                                    !errors.email
                                }
                                placeholder={
                                    FORGOT_PASSWORD_CONSTANTS.emailPlaceholder
                                }
                                type="text"
                                {...register("email", {
                                    maxLength: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailMaxLength,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.emailMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailMinLength,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.emailMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailInvalidEmail,
                                        value: EMAIL,
                                    },
                                    required: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailRequired,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.emailRequired,
                                    },
                                })}
                            />
                            {dirtyFields.email && errors.email && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.email.message}
                                </Form.Control.Feedback>
                            )}
                            {dirtyFields.email && !errors.email && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        FORGOT_PASSWORD_VALIDATION_MESSAGES.validEmail
                                    }
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </div>
                    <div className="mt-2 w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text>
                                <label
                                    className="fw-bold fs-6"
                                    htmlFor="current-confirm-email-form"
                                >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="current-email"
                                id="current-confirm-email-form"
                                isInvalid={
                                    isDirty &&
                                    dirtyFields.confirmEmail &&
                                    errors.confirmEmail !== undefined
                                }
                                isValid={
                                    isDirty &&
                                    dirtyFields.confirmEmail &&
                                    !errors.confirmEmail
                                }
                                placeholder={
                                    FORGOT_PASSWORD_CONSTANTS.confirmEmailPlaceholder
                                }
                                type="text"
                                {...register("confirmEmail", {
                                    maxLength: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailMaxLength,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.emailMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailMinLength,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.emailMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailInvalidEmail,
                                        value: EMAIL,
                                    },
                                    required: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.emailRequired,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.emailRequired,
                                    },
                                    validate: (confirmEmail: string) =>
                                        confirmEmail === watch().email ||
                                        FORGOT_PASSWORD_VALIDATION_MESSAGES.confirmEmailInvalidMatch,
                                })}
                            />
                            {dirtyFields.confirmEmail &&
                                errors.confirmEmail && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmEmail.message}
                                    </Form.Control.Feedback>
                                )}
                            {dirtyFields.confirmEmail &&
                                !errors.confirmEmail && (
                                    <Form.Control.Feedback type="valid">
                                        {
                                            FORGOT_PASSWORD_CONSTANTS.confirmValidEmail
                                        }
                                    </Form.Control.Feedback>
                                )}
                        </InputGroup>
                    </div>
                    <div className="mt-2 w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text>
                                <label htmlFor="current-username-form">
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="current-username"
                                id="current-username-form"
                                isInvalid={
                                    isDirty &&
                                    dirtyFields.username &&
                                    errors.username !== undefined
                                }
                                isValid={
                                    isDirty &&
                                    dirtyFields.username &&
                                    !errors.username
                                }
                                placeholder={
                                    FORGOT_PASSWORD_CONSTANTS.usernamePlaceholder
                                }
                                type="password"
                                {...register("username", {
                                    maxLength: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.usernameMaxLength,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.usernameMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.usernameMinLength,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.usernameMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.usernameInvalid,
                                        value: USERNAME,
                                    },
                                    required: {
                                        message:
                                            FORGOT_PASSWORD_VALIDATION_MESSAGES.usernameRequired,
                                        value: FORGOT_PASSWORD_VALIDATION_VALUES.usernameRequired,
                                    },
                                })}
                            />
                            {dirtyFields?.username && errors.username && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.username.message}
                                </Form.Control.Feedback>
                            )}
                            {dirtyFields.username && !errors.username && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        FORGOT_PASSWORD_VALIDATION_MESSAGES.validUsername
                                    }
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </div>
                    <Button
                        className="w-25 mx-auto"
                        disabled={!isValid || isValidating}
                        onClick={async (): Promise<void> => {
                            const { email, username } = getValues();
                            const response = await UsersApi.forgotPassword({
                                email,
                                username,
                            });
                            const { token } = response;
                            if (token) {
                                const { validUntil } = response;
                                setPasswordToken(token);
                                setPasswordTokenValidUntil(
                                    new Date(validUntil).getTime(),
                                );
                            }
                        }}
                        variant={
                            isValid && !isValidating && isDirty
                                ? "success"
                                : "secondary"
                        }
                    >
                        {FORGOT_PASSWORD_CONSTANTS.buttonText}
                    </Button>
                </div>
            </div>
            {passwordToken && passwordTokenValidUntil && (
                <TokenModal
                    currentDate={new Date(Date.now())}
                    reset={(): void => {
                        setPasswordToken(undefined);
                        setPasswordTokenValidUntil(undefined);
                    }}
                    token={passwordToken}
                    type="password"
                    validUntil={new Date(passwordTokenValidUntil)}
                />
            )}
        </>
    );
};
