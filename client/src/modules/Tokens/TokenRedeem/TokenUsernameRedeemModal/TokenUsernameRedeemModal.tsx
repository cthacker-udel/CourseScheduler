import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { EMAIL } from "src/common";

type TokenModalProps = {
    token: string;
};

const CONSTANTS = {
    btnDisableErrorLimit: 0,
    btnText: "Redeem token",
    header: "Username Token Redemption Portal",
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
};

const VALIDATION_MESSAGES = {
    confirmEmail: {
        match: "Emails must match",
        valid: "Emails match",
    },
    email: {
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
    pattern: EMAIL,
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

/**
 * This modal serves as a redemption of the username token
 *
 * @param props The token to redeem
 */
export const TokenUsernameRedeemModal = ({
    token,
}: TokenModalProps): JSX.Element => {
    const { formState, register, watch } = useForm({
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
    console.log(touchedFields);

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
                        isInvalid={touchedFields.email && errors.email}
                        isValid={touchedFields.email && !errors.email}
                        placeholder="Enter email here..."
                        type="text"
                        {...register("email", EMAIL_USEFORM_RULES)}
                    />
                    {touchedFields.email && errors.email && (
                        <Form.Control.Feedback
                            className="text-center"
                            type="invalid"
                        >
                            {errors.email.message}
                        </Form.Control.Feedback>
                    )}
                    {touchedFields.email && !errors.email && (
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
                            touchedFields.confirmEmail && errors.confirmEmail
                        }
                        isValid={
                            touchedFields.confirmEmail && !errors.confirmEmail
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
                    {touchedFields.confirmEmail && errors.confirmEmail && (
                        <Form.Control.Feedback
                            className="text-center"
                            type="invalid"
                        >
                            {errors.confirmEmail.message}
                        </Form.Control.Feedback>
                    )}
                    {touchedFields.confirmEmail && !errors.confirmEmail && (
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
                        className="w-75"
                        isInvalid={touchedFields.password && errors.password}
                        isValid={touchedFields.password && !errors.password}
                        placeholder="Enter password here..."
                        type="password"
                        {...register("password", PASSWORD_USEFORM_RULES)}
                    />
                    {errors.password && touchedFields.password && (
                        <Form.Control.Feedback
                            className="text-center"
                            type="invalid"
                        >
                            {errors.password.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.password && touchedFields.password && (
                        <Form.Control.Feedback
                            className="text-center"
                            type="valid"
                        >
                            {VALIDATION_MESSAGES.password.valid}
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
