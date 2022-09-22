/* eslint-disable @typescript-eslint/indent -- indenting error that is unfixable as of right now */
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UsersApi } from "src/api/client-side/UsersApi";
import { EMAIL } from "src/common";
import { validatePassword } from "src/helpers";
import { TokenModal } from "src/modules/Tokens/TokenModal/TokenModal";

const FORGOT_USERNAME_CONSTANTS = {
    buttonText: "Request token",
    confirmEmailPlaceholder: "Confirm email here...",
    emailPlaceholder: "Enter email here...",
    forgotUsernameFormHeader: (
        <>
            {"Enter your "}
            <span className="fw-bold fst-italic text-decoration-underline">
                {"email and password"}
            </span>
            {" here to receive a "}
            <span className="fst-italic fw-bold">{"token"}</span>
            {", which you will redeem at the "}
            <span className="fst-italic fw-bold">{"token redeem page"}</span>
            {" to retrieve your username."}
        </>
    ),
    header: "Forgot Username Form",
    passwordPlaceholder: "Enter password here...",
    validConfirmEmail: "Emails Match.",
    validEmail: "Valid Email.",
    validPassword: "Valid Password",
};

const FORGOT_USERNAME_VALIDATION_VALUES = {
    emailMaxLength: 30,
    emailMinLength: 1,
    emailRequired: true,
    passwordLowercaseMin: 1,
    passwordMaxLength: 30,
    passwordMinLength: 1,
    passwordRequired: true,
    passwordSymbolMin: 1,
    passwordUppercaseMin: 1,
};

const FORGOT_USERNAME_VALIDATION_MESSAGES = {
    confirmEmailInvalidMatch: "Emails must match.",
    emailInvalidEmail: "Invalid email entered.",
    emailMaxLength: `Email must be at least ${FORGOT_USERNAME_VALIDATION_VALUES.emailMaxLength} characters.`,
    emailMinLength: `Email must be at most ${FORGOT_USERNAME_VALIDATION_VALUES.emailMinLength} characters.`,
    emailRequired: "Email is required.",
    passwordMaxLength: `Password must be at most ${FORGOT_USERNAME_VALIDATION_VALUES.passwordMaxLength} characters.`,
    passwordMinLength: `Password must be at least ${FORGOT_USERNAME_VALIDATION_VALUES.passwordMinLength} characters.`,
    passwordRequired: "Password is required.",
};

const FORGOT_USERNAME_VALIDATION_PASSWORD_MESSAGES = {
    passwordLowercase: `Password must contain at least ${FORGOT_USERNAME_VALIDATION_VALUES.passwordLowercaseMin} lower character(s).`,
    passwordSymbol: `Password must contain at least ${FORGOT_USERNAME_VALIDATION_VALUES.passwordSymbolMin} symbol character(s).`,
    passwordUppercase: `Password must contain at least ${FORGOT_USERNAME_VALIDATION_VALUES.passwordUppercaseMin} uppercase character(s).`,
};

/**
 * Validates the password entered in by the user
 *
 * @param password The password to verify
 * @returns Boolean if the password is valid, or string if the password is not valid
 */
const validatePass = (password: string): boolean | string => {
    const matches = validatePassword(password);
    if (
        matches.lowercaseMatch &&
        matches.uppercaseMatch &&
        matches.symbolMatch
    ) {
        return true;
    }
    if (!matches.lowercaseMatch) {
        return FORGOT_USERNAME_VALIDATION_PASSWORD_MESSAGES.passwordLowercase;
    }
    if (!matches.uppercaseMatch) {
        return FORGOT_USERNAME_VALIDATION_PASSWORD_MESSAGES.passwordUppercase;
    }
    if (!matches.symbolMatch) {
        return FORGOT_USERNAME_VALIDATION_PASSWORD_MESSAGES.passwordSymbol;
    }
    return "Server Error";
};

/**
 * When the user forgot their username, form to retrieve a token and then enter it into a prompt to reset it
 */
export const ForgotUsername = (): JSX.Element => {
    const { formState, getValues, register, watch } = useForm({
        criteriaMode: "all",
        defaultValues: {
            confirmEmail: "",
            email: "",
            password: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const [usernameToken, setUsernameToken] = React.useState<string>();
    const [usernameTokenValidUntil, setUsernameTokenValidUntil] =
        React.useState<number>();

    const { errors, dirtyFields, isDirty, isValid, isValidating } = formState;

    return (
        <>
            <div className="h-100 d-flex flex-row justify-content-center align-items-center">
                <div className="border border-3 border-secondary rounded p-3 shadow-lg bg-light bg-gradient d-flex flex-column justify-content-around h-75">
                    <div className="mx-auto w-50 text-center fw-bold fs-4 text-wrap text-decoration-underline">
                        {FORGOT_USERNAME_CONSTANTS.header}
                    </div>
                    <div className="p-2 mt-3 shadow bg-info bg-opacity-25 rounded text-wrap w-50 mx-auto">
                        {FORGOT_USERNAME_CONSTANTS.forgotUsernameFormHeader}
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
                                    FORGOT_USERNAME_CONSTANTS.emailPlaceholder
                                }
                                type="text"
                                {...register("email", {
                                    maxLength: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailMaxLength,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.emailMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailMinLength,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.emailMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailInvalidEmail,
                                        value: EMAIL,
                                    },
                                    required: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailRequired,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.emailRequired,
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
                                    {FORGOT_USERNAME_CONSTANTS.validEmail}
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
                                    FORGOT_USERNAME_CONSTANTS.confirmEmailPlaceholder
                                }
                                type="text"
                                {...register("confirmEmail", {
                                    maxLength: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailMaxLength,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.emailMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailMinLength,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.emailMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailInvalidEmail,
                                        value: EMAIL,
                                    },
                                    required: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.emailRequired,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.emailRequired,
                                    },
                                    validate: (confirmEmail: string) =>
                                        confirmEmail === watch().email ||
                                        FORGOT_USERNAME_VALIDATION_MESSAGES.confirmEmailInvalidMatch,
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
                                            FORGOT_USERNAME_CONSTANTS.validConfirmEmail
                                        }
                                    </Form.Control.Feedback>
                                )}
                        </InputGroup>
                    </div>
                    <div className="mt-2 w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text>
                                <label htmlFor="current-password-form">
                                    <FontAwesomeIcon icon={faKey} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="current-password"
                                id="current-password-form"
                                isInvalid={
                                    isDirty &&
                                    dirtyFields.password &&
                                    errors.password !== undefined
                                }
                                isValid={
                                    isDirty &&
                                    dirtyFields.password &&
                                    !errors.password
                                }
                                placeholder={
                                    FORGOT_USERNAME_CONSTANTS.passwordPlaceholder
                                }
                                type="password"
                                {...register("password", {
                                    maxLength: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.passwordMaxLength,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.passwordMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.passwordMinLength,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.passwordMinLength,
                                    },
                                    required: {
                                        message:
                                            FORGOT_USERNAME_VALIDATION_MESSAGES.passwordRequired,
                                        value: FORGOT_USERNAME_VALIDATION_VALUES.passwordRequired,
                                    },
                                    validate: (pass: string) =>
                                        validatePass(pass),
                                })}
                            />
                            {dirtyFields?.password && errors.password && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.password.message}
                                </Form.Control.Feedback>
                            )}
                            {dirtyFields.password && !errors.password && (
                                <Form.Control.Feedback type="valid">
                                    {FORGOT_USERNAME_CONSTANTS.validPassword}
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </div>
                    <Button
                        className="w-25 mx-auto"
                        disabled={!isValid || isValidating}
                        onClick={async (): Promise<void> => {
                            const { email, password } = getValues();
                            const response = await UsersApi.forgotUsername({
                                email,
                                password,
                            });
                            const { token } = response;
                            if (token) {
                                const { validUntil } = response;
                                setUsernameToken(token);
                                setUsernameTokenValidUntil(
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
                        {FORGOT_USERNAME_CONSTANTS.buttonText}
                    </Button>
                </div>
            </div>
            {usernameToken && usernameTokenValidUntil !== undefined && (
                <TokenModal
                    currentDate={new Date(Date.now())}
                    reset={(): void => {
                        setUsernameToken(undefined);
                        setUsernameTokenValidUntil(undefined);
                    }}
                    token={usernameToken}
                    type="username"
                    validUntil={new Date(usernameTokenValidUntil)}
                />
            )}
        </>
    );
};
