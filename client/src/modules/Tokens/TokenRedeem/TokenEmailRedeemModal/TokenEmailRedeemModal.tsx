/* eslint-disable @typescript-eslint/indent -- conflict with prettier */
/* eslint-disable no-implicit-coercion -- for !! on isInvalid, error appears nowhere else */
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { ApiSuccess } from "src/@types";
import { UsersApi } from "src/api/client-side/UsersApi";
import { EMAIL, USERNAME } from "src/common";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";

type CloseType = "email" | "password" | "username";

type TokenModalProperties = {
    close: (_type?: CloseType) => void;
    token: string;
};

const CONSTANTS = {
    btnDisableErrorLimit: 0,
    btnText: "Redeem token",
    header: "Email Token Redemption Portal",
    signUpEmailErrorStatus: 200,
};

const VALIDATION_VALUES = {
    email: {
        maxLength: 70,
        minLength: 1,
        required: true,
    },
    password: {
        maxLength: 70,
        minLength: 1,
        required: true,
    },
    username: {
        maxLength: 20,
        minLength: 1,
        required: true,
    },
};

const VALIDATION_MESSAGES = {
    confirmUsername: {
        match: "Usernames must match",
        valid: "Usernames match",
    },
    email: {
        invalid: "Email is invalid.",
        maxLength: "Email must be at most 70 characters.",
        minLength: "Email must be at least 1 character.",
        required: "Email is required",
        valid: "Email is valid",
    },
    password: {
        maxLength: "Password must be at most 70 characters.",
        minLength: "Password must be at least 1 character",
        required: "Password is required",
        valid: "Password is valid",
    },
    username: {
        exists: "Username already exists",
        maxLength: "Username must be at most 20 characters",
        minLength: "Username must be at least 1 character",
        required: "Username is required",
        valid: "Username is invalid",
    },
};

const EMAIL_USEFORM_RULES = {
    maxLength: {
        message: VALIDATION_MESSAGES.email.maxLength,
        value: VALIDATION_VALUES.email.maxLength,
    },
    minLength: {
        message: VALIDATION_MESSAGES.email.minLength,
        value: VALIDATION_VALUES.email.minLength,
    },
    pattern: {
        message: VALIDATION_MESSAGES.email.invalid,
        value: EMAIL,
    },
    required: {
        message: VALIDATION_MESSAGES.email.required,
        value: VALIDATION_VALUES.email.required,
    },
};

const PASSWORD_USEFORM_RULES = {
    maxLength: {
        message: VALIDATION_MESSAGES.password.maxLength,
        value: VALIDATION_VALUES.password.maxLength,
    },
    minLength: {
        message: VALIDATION_MESSAGES.password.minLength,
        value: VALIDATION_VALUES.password.minLength,
    },
    required: {
        message: VALIDATION_MESSAGES.password.required,
        value: VALIDATION_VALUES.password.required,
    },
};

const USERNAME_USEFORM_RULES = {
    maxLength: {
        message: VALIDATION_MESSAGES.username.maxLength,
        value: VALIDATION_VALUES.username.maxLength,
    },
    minLength: {
        message: VALIDATION_MESSAGES.username.minLength,
        value: VALIDATION_VALUES.username.minLength,
    },
    pattern: {
        message: VALIDATION_MESSAGES.username.valid,
        value: USERNAME,
    },
    required: {
        message: VALIDATION_MESSAGES.username.required,
        value: VALIDATION_VALUES.username.required,
    },
};

/**
 * This modal serves as a redemption of the username token
 *
 * @param props The token to redeem
 */
export const TokenEmailRedeemModal = ({
    close,
    token,
}: TokenModalProperties): JSX.Element => {
    const { addNotification } = useNotificationContext();
    const {
        getValues,
        formState,
        register,
        setError,
        setValue,
        trigger,
        watch,
    } = useForm({
        defaultValues: {
            confirmUsername: "",
            newEmail: "",
            password: "",
            username: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const { errors, dirtyFields, touchedFields } = formState;

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{CONSTANTS.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-around p-4">
                <InputGroup className="d-flex flex-row mb-3">
                    <FontAwesomeIcon className="pe-4 my-auto" icon={faUser} />
                    <Form.Control
                        isInvalid={
                            (touchedFields.username || dirtyFields.username) &&
                            !!errors.username
                        }
                        isValid={
                            (touchedFields.username || dirtyFields.username) &&
                            !errors.username
                        }
                        placeholder="Enter username here..."
                        type="text"
                        {...register("username", USERNAME_USEFORM_RULES)}
                    />
                    {(touchedFields.username || dirtyFields.username) &&
                        errors.username && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="invalid"
                            >
                                {errors.username.message}
                            </Form.Control.Feedback>
                        )}
                    {(touchedFields.username || dirtyFields.username) &&
                        !errors.username && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="valid"
                            >
                                {VALIDATION_MESSAGES.username.valid}
                            </Form.Control.Feedback>
                        )}
                </InputGroup>
                <InputGroup className="d-flex flex-row mb-3">
                    <FontAwesomeIcon className="pe-4 my-auto" icon={faUser} />
                    <Form.Control
                        isInvalid={
                            (touchedFields.confirmUsername ||
                                dirtyFields.confirmUsername) &&
                            !!errors.confirmUsername
                        }
                        isValid={
                            (touchedFields.confirmUsername ||
                                dirtyFields.confirmUsername) &&
                            !errors.confirmUsername
                        }
                        placeholder="Confirm username here..."
                        type="text"
                        {...register("confirmUsername", {
                            ...USERNAME_USEFORM_RULES,
                            validate: (confirmedUsername) =>
                                confirmedUsername === watch().username ||
                                VALIDATION_MESSAGES.confirmUsername.match,
                        })}
                    />
                    {(touchedFields.confirmUsername ||
                        dirtyFields.confirmUsername) &&
                        errors.confirmUsername && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="invalid"
                            >
                                {errors.confirmUsername.message}
                            </Form.Control.Feedback>
                        )}
                    {(touchedFields.confirmUsername ||
                        dirtyFields.confirmUsername) &&
                        !errors.confirmUsername && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="valid"
                            >
                                {VALIDATION_MESSAGES.confirmUsername.valid}
                            </Form.Control.Feedback>
                        )}
                </InputGroup>
                <InputGroup className="d-flex flex-row mb-4">
                    <FontAwesomeIcon className="pe-4 my-auto" icon={faKey} />
                    <Form.Control
                        isInvalid={
                            (touchedFields.password || dirtyFields.password) &&
                            !!errors.password
                        }
                        isValid={
                            (touchedFields.password || dirtyFields.password) &&
                            !errors.password
                        }
                        placeholder="Enter password here..."
                        type="password"
                        {...register("password", PASSWORD_USEFORM_RULES)}
                    />
                    {errors.password &&
                        (touchedFields.password || dirtyFields.password) && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="invalid"
                            >
                                {errors.password.message}
                            </Form.Control.Feedback>
                        )}
                    {!errors.password &&
                        (touchedFields.password || dirtyFields.password) && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="valid"
                            >
                                {VALIDATION_MESSAGES.password.valid}
                            </Form.Control.Feedback>
                        )}
                </InputGroup>
                <InputGroup className="d-flex flex-row mb-4">
                    <FontAwesomeIcon
                        className="pe-4 my-auto"
                        icon={faEnvelope}
                    />
                    <Form.Control
                        isInvalid={
                            (touchedFields.newEmail || dirtyFields.newEmail) &&
                            !!errors.newEmail
                        }
                        isValid={
                            touchedFields.newEmail &&
                            dirtyFields.newEmail &&
                            !errors.newEmail
                        }
                        placeholder="Enter new email here"
                        type="text"
                        {...register("newEmail", {
                            ...EMAIL_USEFORM_RULES,
                            onChange: async (
                                email: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                const enteredEmail = email.target.value;
                                setValue("newEmail", enteredEmail);
                                await trigger("newEmail");
                                if (!errors.newEmail) {
                                    const result = await UsersApi.checkEmail({
                                        email: enteredEmail,
                                    });
                                    if (
                                        (result as ApiSuccess).status ===
                                        CONSTANTS.signUpEmailErrorStatus
                                    ) {
                                        setError("newEmail", {
                                            message:
                                                VALIDATION_MESSAGES.username
                                                    .exists,
                                            type: "validate",
                                        });
                                    }
                                }
                            },
                        })}
                    />
                    {(touchedFields.newEmail || dirtyFields.newEmail) &&
                        errors.newEmail && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="invalid"
                            >
                                {errors.newEmail.message}
                            </Form.Control.Feedback>
                        )}
                    {(touchedFields.newEmail || dirtyFields.newEmail) &&
                        !errors.newEmail && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="valid"
                            >
                                {VALIDATION_MESSAGES.email.valid}
                            </Form.Control.Feedback>
                        )}
                </InputGroup>
                <Button
                    className="w-50 mx-auto"
                    disabled={
                        Object.keys(errors).length >
                            CONSTANTS.btnDisableErrorLimit ||
                        !dirtyFields.username ||
                        !dirtyFields.confirmUsername ||
                        !dirtyFields.password ||
                        !dirtyFields.newEmail
                    }
                    onClick={async (): Promise<void> => {
                        const isTokenValid = await UsersApi.validateEmailToken({
                            password: getValues().password,
                            token,
                            username: getValues().username,
                        });
                        if (isTokenValid.accepted) {
                            const response = await UsersApi.changeEmailByToken({
                                newEmail: getValues().newEmail,
                                password: getValues().password,
                                token,
                                username: getValues().username,
                            });
                            if (response.changed) {
                                addNotification({
                                    message: {
                                        body: "Your email has officially been changed!",
                                        header: "Email token redemption success!",
                                    },
                                    variant: "success",
                                });
                            } else {
                                addNotification({
                                    message: {
                                        body: "Your email has not been changed! Invalid Token or the operation failed.",
                                        header: "Email token redemption failure!",
                                    },
                                    variant: "error",
                                });
                            }
                            close("email");
                        } else {
                            addNotification({
                                message: {
                                    body: "Your email token was invalid or the operation failed, please try again.",
                                    header: "Email token redemption failure!",
                                },
                                variant: "error",
                            });
                            close("email");
                        }
                    }}
                    variant={
                        Object.keys(errors).length >
                        CONSTANTS.btnDisableErrorLimit
                            ? "secondary"
                            : "success"
                    }
                >
                    {CONSTANTS.btnText}
                </Button>
            </Modal.Body>
        </>
    );
};
