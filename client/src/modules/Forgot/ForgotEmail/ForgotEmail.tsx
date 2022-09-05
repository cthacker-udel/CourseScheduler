/* eslint-disable @typescript-eslint/indent -- indenting error that is unfixable as of right now */
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UsersApi } from "src/api/client-side/UsersApi";
import { USERNAME } from "src/common";
import { validatePassword } from "src/helpers";
import { TokenModal } from "src/modules/Tokens/TokenModal/TokenModal";

const FORGOT_EMAIL_CONSTANTS = {
    buttonText: "Request token",
    confirmUsernamePlaceholder: "Confirm username here...",
    forgotUsernameFormHeader: (
        <>
            {"Enter your "}
            <span className="fw-bold fst-italic text-decoration-underline">
                {"username and password"}
            </span>
            {" here to receive a "}
            <span className="fst-italic fw-bold">{"token"}</span>
            {", which you will redeem at the "}
            <span className="fst-italic fw-bold">{"token redeem page"}</span>
            {" to retrieve your email."}
        </>
    ),
    header: "Forgot Email Form",
    passwordPlaceholder: "Enter password here...",
    usernamePlaceholder: "Enter username here...",
    validConfirmUsername: "Usernames Match.",
    validPassword: "Valid Password",
    validUsername: "Valid Username.",
};

const FORGOT_EMAIL_VALIDATION_VALUES = {
    passwordLowercaseMin: 1,
    passwordMaxLength: 30,
    passwordMinLength: 1,
    passwordRequired: true,
    passwordSymbolMin: 1,
    passwordUppercaseMin: 1,
    usernameMaxLength: 30,
    usernameMinLength: 1,
    usernameRequired: true,
};

const FORGOT_EMAIL_VALIDATION_MESSAGES = {
    confirmUsernameInvalidMatch: "Usernames must match.",
    passwordMaxLength: `Password must be at most ${FORGOT_EMAIL_VALIDATION_VALUES.passwordMaxLength} characters.`,
    passwordMinLength: `Password must be at least ${FORGOT_EMAIL_VALIDATION_VALUES.passwordMinLength} characters.`,
    passwordRequired: "Password is required.",
    usernameInvalidUsername: "Invalid username entered.",
    usernameMaxLength: `Username must be at least ${FORGOT_EMAIL_VALIDATION_VALUES.usernameMaxLength} characters.`,
    usernameMinLength: `Username must be at most ${FORGOT_EMAIL_VALIDATION_VALUES.usernameMinLength} characters.`,
    usernameRequired: "Username is required.",
};

const FORGOT_EMAIL_VALIDATION_PASSWORD_MESSAGES = {
    passwordLowercase: `Password must contain at least ${FORGOT_EMAIL_VALIDATION_VALUES.passwordLowercaseMin} lower character(s).`,
    passwordSymbol: `Password must contain at least ${FORGOT_EMAIL_VALIDATION_VALUES.passwordSymbolMin} symbol character(s).`,
    passwordUppercase: `Password must contain at least ${FORGOT_EMAIL_VALIDATION_VALUES.passwordUppercaseMin} uppercase character(s).`,
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
        return FORGOT_EMAIL_VALIDATION_PASSWORD_MESSAGES.passwordLowercase;
    }
    if (!matches.uppercaseMatch) {
        return FORGOT_EMAIL_VALIDATION_PASSWORD_MESSAGES.passwordUppercase;
    }
    if (!matches.symbolMatch) {
        return FORGOT_EMAIL_VALIDATION_PASSWORD_MESSAGES.passwordSymbol;
    }
    return "Server Error";
};

/**
 * When the user forgot their username, form to retrieve a token and then enter it into a prompt to reset it
 */
export const ForgotEmail = (): JSX.Element => {
    const { formState, getValues, register, watch } = useForm({
        criteriaMode: "all",
        defaultValues: {
            confirmUsername: "",
            password: "",
            username: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const [emailToken, setEmailToken] = React.useState<string>();
    const [emailTokenValidUntil, setEmailTokenValidUntil] =
        React.useState<number>();

    const { errors, dirtyFields, isDirty, isValid, isValidating } = formState;

    return (
        <>
            <div className="h-100 d-flex flex-row justify-content-center align-items-center">
                <div className="border border-3 border-secondary rounded p-3 shadow-lg bg-light bg-gradient d-flex flex-column justify-content-around h-75">
                    <div className="mx-auto w-50 text-center fw-bold fs-4 text-wrap text-decoration-underline">
                        {FORGOT_EMAIL_CONSTANTS.header}
                    </div>
                    <div className="p-2 mt-3 shadow bg-info bg-opacity-25 rounded text-wrap w-50 mx-auto">
                        {FORGOT_EMAIL_CONSTANTS.forgotUsernameFormHeader}
                    </div>
                    <div className="mt-2 w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text>
                                <label
                                    className="fw-bold fs-6"
                                    htmlFor="current-username-form"
                                >
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
                                    FORGOT_EMAIL_CONSTANTS.usernamePlaceholder
                                }
                                type="text"
                                {...register("username", {
                                    maxLength: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameMaxLength,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.usernameMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameMinLength,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.usernameMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameInvalidUsername,
                                        value: USERNAME,
                                    },
                                    required: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameRequired,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.usernameRequired,
                                    },
                                })}
                            />
                            {dirtyFields.username && errors.username && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.username.message}
                                </Form.Control.Feedback>
                            )}
                            {dirtyFields.username && !errors.username && (
                                <Form.Control.Feedback type="valid">
                                    {FORGOT_EMAIL_CONSTANTS.validUsername}
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </div>
                    <div className="mt-2 w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text>
                                <label
                                    className="fw-bold fs-6"
                                    htmlFor="current-confirm-username-form"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="current-username"
                                id="current-confirm-username-form"
                                isInvalid={
                                    isDirty &&
                                    dirtyFields.confirmUsername &&
                                    errors.confirmUsername !== undefined
                                }
                                isValid={
                                    isDirty &&
                                    dirtyFields.confirmUsername &&
                                    !errors.confirmUsername
                                }
                                placeholder={
                                    FORGOT_EMAIL_CONSTANTS.confirmUsernamePlaceholder
                                }
                                type="text"
                                {...register("confirmUsername", {
                                    maxLength: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameMaxLength,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.usernameMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameMinLength,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.usernameMinLength,
                                    },
                                    pattern: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameInvalidUsername,
                                        value: USERNAME,
                                    },
                                    required: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.usernameRequired,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.usernameRequired,
                                    },
                                    validate: (confirmUsername: string) =>
                                        confirmUsername === watch().username ||
                                        FORGOT_EMAIL_VALIDATION_MESSAGES.confirmUsernameInvalidMatch,
                                })}
                            />
                            {dirtyFields.confirmUsername &&
                                errors.confirmUsername && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmUsername.message}
                                    </Form.Control.Feedback>
                                )}
                            {dirtyFields.confirmUsername &&
                                !errors.confirmUsername && (
                                    <Form.Control.Feedback type="valid">
                                        {
                                            FORGOT_EMAIL_CONSTANTS.validConfirmUsername
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
                                    FORGOT_EMAIL_CONSTANTS.passwordPlaceholder
                                }
                                type="password"
                                {...register("password", {
                                    maxLength: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.passwordMaxLength,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.passwordMaxLength,
                                    },
                                    minLength: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.passwordMinLength,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.passwordMinLength,
                                    },
                                    required: {
                                        message:
                                            FORGOT_EMAIL_VALIDATION_MESSAGES.passwordRequired,
                                        value: FORGOT_EMAIL_VALIDATION_VALUES.passwordRequired,
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
                                    {FORGOT_EMAIL_CONSTANTS.validPassword}
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </div>
                    <Button
                        className="w-25 mx-auto"
                        disabled={!isValid || isValidating}
                        onClick={async (): Promise<void> => {
                            const { username, password } = getValues();
                            const response = await UsersApi.forgotEmail({
                                password,
                                username,
                            });
                            const { token } = response;
                            if (token) {
                                const { validUntil } = response;
                                setEmailToken(token);
                                setEmailTokenValidUntil(
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
                        {FORGOT_EMAIL_CONSTANTS.buttonText}
                    </Button>
                </div>
            </div>
            {emailToken && emailTokenValidUntil && (
                <TokenModal
                    currentDate={new Date(Date.now())}
                    reset={(): void => {
                        setEmailToken(undefined);
                        setEmailTokenValidUntil(undefined);
                    }}
                    token={emailToken}
                    type="email"
                    validUntil={new Date(emailTokenValidUntil)}
                />
            )}
        </>
    );
};
