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

type TokenModalProps = {
    token: string;
};

const CONSTANTS = {
    btnDisableErrorLimit: 0,
    btnText: "Redeem token",
    header: "Username Token Redemption Portal",
    signUpUsernameErrorStatus: 200,
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
    confirmEmail: {
        match: "Emails must match",
        valid: "Emails match",
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
export const TokenUsernameRedeemModal = ({
    token,
}: TokenModalProps): JSX.Element => {
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
            confirmEmail: "",
            email: "",
            newUsername: "",
            password: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const { errors, dirtyFields, touchedFields } = formState;

    console.log(errors);

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{CONSTANTS.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-around p-4">
                <InputGroup className="d-flex flex-row mb-3">
                    <FontAwesomeIcon
                        className="pe-4 my-auto"
                        icon={faEnvelope}
                    />
                    <Form.Control
                        isInvalid={
                            (touchedFields.email || dirtyFields.email) &&
                            !!errors.email
                        }
                        isValid={
                            (touchedFields.email || dirtyFields.email) &&
                            !errors.email
                        }
                        placeholder="Enter email here..."
                        type="text"
                        {...register("email", EMAIL_USEFORM_RULES)}
                    />
                    {(touchedFields.email || dirtyFields.email) &&
                        errors.email && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="invalid"
                            >
                                {errors.email.message}
                            </Form.Control.Feedback>
                        )}
                    {(touchedFields.email || dirtyFields.email) &&
                        !errors.email && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="valid"
                            >
                                {VALIDATION_MESSAGES.email.valid}
                            </Form.Control.Feedback>
                        )}
                </InputGroup>
                <InputGroup className="d-flex flex-row mb-3">
                    <FontAwesomeIcon
                        className="pe-4 my-auto"
                        icon={faEnvelope}
                    />
                    <Form.Control
                        isInvalid={
                            (touchedFields.confirmEmail ||
                                dirtyFields.confirmEmail) &&
                            !!errors.confirmEmail
                        }
                        isValid={
                            (touchedFields.confirmEmail ||
                                dirtyFields.confirmEmail) &&
                            !errors.confirmEmail
                        }
                        placeholder="Confirm email here..."
                        type="text"
                        {...register("confirmEmail", {
                            ...EMAIL_USEFORM_RULES,
                            validate: (confirmedEmail) =>
                                confirmedEmail === watch().email ||
                                VALIDATION_MESSAGES.confirmEmail.match,
                        })}
                    />
                    {(touchedFields.confirmEmail || dirtyFields.confirmEmail) &&
                        errors.confirmEmail && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="invalid"
                            >
                                {errors.confirmEmail.message}
                            </Form.Control.Feedback>
                        )}
                    {(touchedFields.confirmEmail || dirtyFields.confirmEmail) &&
                        !errors.confirmEmail && (
                            <Form.Control.Feedback
                                className="text-center"
                                type="valid"
                            >
                                {VALIDATION_MESSAGES.confirmEmail.valid}
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
                    <FontAwesomeIcon className="pe-4 my-auto" icon={faUser} />
                    <Form.Control
                        isInvalid={
                            (touchedFields.newUsername ||
                                dirtyFields.newUsername) &&
                            !!errors.newUsername
                        }
                        isValid={
                            touchedFields.newUsername &&
                            dirtyFields.newUsername &&
                            !errors.newUsername
                        }
                        placeholder="Enter new username here"
                        type="text"
                        {...register("newUsername", {
                            ...USERNAME_USEFORM_RULES,
                            onChange: async (
                                username: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                const enteredUsername = username.target.value;
                                setValue("newUsername", enteredUsername);
                                await trigger("newUsername");
                                if (!errors.newUsername) {
                                    const result = await UsersApi.checkUsername(
                                        {
                                            username: enteredUsername,
                                        },
                                    );
                                    console.log("result = ", result);
                                    if (
                                        (result as ApiSuccess).status ===
                                        CONSTANTS.signUpUsernameErrorStatus
                                    ) {
                                        setError("newUsername", {
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
                    {(touchedFields.newUsername || dirtyFields.newUsername) &&
                        errors.newUsername && (
                            <Form.Control.Feedback className="text-center" type="invalid">
                                {errors.newUsername.message}
                            </Form.Control.Feedback>
                        )}
                    {(touchedFields.newUsername || dirtyFields.newUsername) &&
                        !errors.newUsername && (
                            <Form.Control.Feedback className="text-center" type="valid">
                                {VALIDATION_MESSAGES.username.valid}
                            </Form.Control.Feedback>
                        )}
                </InputGroup>
                <Button
                    className="w-50 mx-auto"
                    disabled={
                        Object.keys(errors).length >
                            CONSTANTS.btnDisableErrorLimit ||
                        !dirtyFields.email ||
                        !dirtyFields.confirmEmail ||
                        !dirtyFields.password
                    }
                    onClick={async (): Promise<void> => {
                        const isTokenValid =
                            await UsersApi.validateUsernameToken({
                                email: getValues().email,
                                password: getValues().password,
                                token,
                            });
                        if (isTokenValid.accepted) {
                            console.log("accepted");
                        } else {
                            console.log("denied");
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
