import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { ForgotTokenType } from "src/@types";

import { TokenRedeemModal } from "./TokenRedeem/TokenRedeemModal";

type CloseType = "email" | "password" | "username";

const TOKENS_CONSTANTS = {
    email: {
        label: "Email token",
        placeholder: "Enter email token here...",
    },
    password: {
        label: "Password token",
        placeholder: "Enter password token here...",
    },
    username: {
        label: "Username token",
        placeholder: "Enter username token here...",
    },
};

const TOKENS_VALIDATION_VALUES = {
    email: {
        maxLength: 128,
        minLength: 128,
    },
    password: {
        maxLength: 128,
        minLength: 128,
    },
    username: {
        maxLength: 128,
        minLength: 128,
    },
};

const TOKENS_VALIDATION_MESSAGES = {
    email: {
        maxLength: "Email token must be 256 characters",
        minLength: "Email token must be 256 characters",
        redeem: "Redeem Email Token",
        valid: "Valid Email Token",
    },
    password: {
        maxLength: "Password token must 256 characters",
        minLength: "Password token must 256 characters",
        redeem: "Redeem Password Token",
        valid: "Valid Password Token",
    },
    username: {
        maxLength: "Username token must 256 characters",
        minLength: "Username token must 256 characters",
        redeem: "Redeem Username Token",
        valid: "Valid Username Token",
    },
};

/**
 * Token dashboard, where a user can redeem their reset tokens to edit their user credentials
 *
 * @returns The token dashboard
 */
export const Tokens = (): JSX.Element => {
    const { formState, register, setValue, watch } = useForm({
        defaultValues: { email: "", password: "", username: "" },
        mode: "all",
        reValidateMode: "onChange",
    });

    const [showTokenModal, setShowTokenModal] = React.useState<boolean>(false);
    const [tokenModalType, setTokenModalType] =
        React.useState<ForgotTokenType>();

    const { errors, dirtyFields } = formState;

    return (
        <div className="h-100 d-flex flex-row justify-content-center align-items-center">
            <span className="d-flex flex-column w-75">
                <Alert
                    className="text-center text-wrap opacity-75 w-50 mx-auto"
                    variant="info"
                >
                    {
                        "Welcome to the Token Redemption Page. This is where you can redeem your reset tokens to set either your username, email, or password. Don't forget they expire!"
                    }
                </Alert>
                <Card className="mt-3">
                    <Card.Header className="text-center fw-bold fs-4">
                        {"Token Redemption Page"}
                    </Card.Header>
                    <Card.Body className="d-flex flex-row justify-content-around mt-3">
                        <div className="d-flex flex-column">
                            <span className="d-flex flex-row justify-content-center">
                                <FontAwesomeIcon
                                    className="my-auto me-2"
                                    icon={faUser}
                                />
                                <span className="fw-bold">{"Username"}</span>
                            </span>
                            <FloatingLabel
                                className="mt-3"
                                controlId="usernameFloatingInput"
                                label={TOKENS_CONSTANTS.username.label}
                            >
                                <Form.Control
                                    isInvalid={
                                        dirtyFields.username &&
                                        errors.username &&
                                        true
                                    }
                                    isValid={
                                        dirtyFields.username &&
                                        !errors.username &&
                                        true
                                    }
                                    {...register("username", {
                                        maxLength: {
                                            message:
                                                TOKENS_VALIDATION_MESSAGES
                                                    .username.maxLength,
                                            value: TOKENS_VALIDATION_VALUES
                                                .username.maxLength,
                                        },
                                        minLength: {
                                            message:
                                                TOKENS_VALIDATION_MESSAGES
                                                    .username.minLength,
                                            value: TOKENS_VALIDATION_VALUES
                                                .username.minLength,
                                        },
                                    })}
                                    placeholder={
                                        TOKENS_CONSTANTS.username.placeholder
                                    }
                                />
                                {errors.username && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username.message}
                                    </Form.Control.Feedback>
                                )}
                                {!errors.username && (
                                    <Form.Control.Feedback type="valid">
                                        {
                                            TOKENS_VALIDATION_MESSAGES.username
                                                .valid
                                        }
                                    </Form.Control.Feedback>
                                )}
                            </FloatingLabel>
                            <Button
                                className="mt-3"
                                disabled={
                                    (!dirtyFields.username ||
                                        errors.username) &&
                                    true
                                }
                                onClick={(): void => {
                                    setShowTokenModal(true);
                                    setTokenModalType("username");
                                }}
                                variant={
                                    !dirtyFields.username || errors.username
                                        ? "secondary"
                                        : "success"
                                }
                            >
                                {TOKENS_VALIDATION_MESSAGES.username.redeem}
                            </Button>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="d-flex flex-row justify-content-center">
                                <FontAwesomeIcon
                                    className="my-auto me-2"
                                    icon={faEnvelope}
                                />
                                <span className="fw-bold">{"Email"}</span>
                            </span>
                            <FloatingLabel
                                className="mt-3"
                                controlId="emailTokenFloatingInput"
                                label={TOKENS_CONSTANTS.email.label}
                            >
                                <Form.Control
                                    isInvalid={
                                        dirtyFields.email &&
                                        errors.email &&
                                        true
                                    }
                                    isValid={
                                        dirtyFields.email &&
                                        !errors.email &&
                                        true
                                    }
                                    {...register("email", {
                                        maxLength: {
                                            message:
                                                TOKENS_VALIDATION_MESSAGES.email
                                                    .maxLength,
                                            value: TOKENS_VALIDATION_VALUES
                                                .email.maxLength,
                                        },
                                        minLength: {
                                            message:
                                                TOKENS_VALIDATION_MESSAGES.email
                                                    .minLength,
                                            value: TOKENS_VALIDATION_VALUES
                                                .email.minLength,
                                        },
                                    })}
                                    placeholder={
                                        TOKENS_CONSTANTS.email.placeholder
                                    }
                                />
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email.message}
                                    </Form.Control.Feedback>
                                )}
                                {!errors.email && (
                                    <Form.Control.Feedback type="valid">
                                        {TOKENS_VALIDATION_MESSAGES.email.valid}
                                    </Form.Control.Feedback>
                                )}
                            </FloatingLabel>
                            <Button
                                className="mt-3"
                                disabled={
                                    (!dirtyFields.email || errors.email) && true
                                }
                                onClick={(): void => {
                                    setShowTokenModal(true);
                                    setTokenModalType("email");
                                }}
                                variant={
                                    !dirtyFields.email || errors.email
                                        ? "secondary"
                                        : "success"
                                }
                            >
                                {TOKENS_VALIDATION_MESSAGES.email.redeem}
                            </Button>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="d-flex flex-row justify-content-center">
                                <FontAwesomeIcon
                                    className="my-auto me-2"
                                    icon={faKey}
                                />
                                <span className="fw-bold">{"Password"}</span>
                            </span>
                            <FloatingLabel
                                className="mt-3"
                                controlId="passwordTokenFloatingInput"
                                label={TOKENS_CONSTANTS.password.label}
                            >
                                <Form.Control
                                    isInvalid={
                                        dirtyFields.password &&
                                        errors.password &&
                                        true
                                    }
                                    isValid={
                                        dirtyFields.password &&
                                        !errors.password &&
                                        true
                                    }
                                    {...register("password", {
                                        maxLength: {
                                            message:
                                                TOKENS_VALIDATION_MESSAGES
                                                    .password.maxLength,
                                            value: TOKENS_VALIDATION_VALUES
                                                .password.maxLength,
                                        },
                                        minLength: {
                                            message:
                                                TOKENS_VALIDATION_MESSAGES
                                                    .password.minLength,
                                            value: TOKENS_VALIDATION_VALUES
                                                .password.minLength,
                                        },
                                    })}
                                    placeholder={
                                        TOKENS_CONSTANTS.password.placeholder
                                    }
                                />
                                {errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password.message}
                                    </Form.Control.Feedback>
                                )}
                                {!errors.password && (
                                    <Form.Control.Feedback type="valid">
                                        {
                                            TOKENS_VALIDATION_MESSAGES.password
                                                .valid
                                        }
                                    </Form.Control.Feedback>
                                )}
                            </FloatingLabel>
                            <Button
                                className="mt-3"
                                disabled={
                                    (!dirtyFields.password ||
                                        errors.password) &&
                                    true
                                }
                                onClick={(): void => {
                                    setShowTokenModal(true);
                                    setTokenModalType("password");
                                }}
                                variant={
                                    !dirtyFields.password || errors.password
                                        ? "secondary"
                                        : "success"
                                }
                            >
                                {TOKENS_VALIDATION_MESSAGES.password.redeem}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </span>
            {showTokenModal && tokenModalType && (
                <TokenRedeemModal
                    close={(type?: CloseType): void => {
                        setShowTokenModal(false);
                        if (type) {
                            setValue(type, "");
                        }
                    }}
                    token={watch()[tokenModalType]}
                    type={tokenModalType}
                />
            )}
        </div>
    );
};
