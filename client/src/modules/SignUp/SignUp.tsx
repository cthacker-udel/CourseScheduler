import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Form, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { generateTooltip } from "../common/utils/generateTooltip";
import styles from "./SignUp.module.css";

/**
 * General text field min length
 */
const TEXT_FIELD_MIN_LENGTH = 1;

/**
 * Password max length
 */
const PASSWORD_MAX_LENGTH = 30;

/**
 * Password min length
 */
const PASSWORD_MIN_LENGTH = 7;

/**
 * Sign-Up Page component, will communicate with back-end to sign user up and insert record into mongo database
 */
export const SignUp = (): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, formState, watch } = useForm({
        defaultValues: {
            confirmPassword: "",
            password: "",
            username: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const intl = useIntl();
    const userNameWatch = watch("username");
    const passwordWatch = watch("password");
    const { errors, dirtyFields, isValid } = formState;
    console.log(
        "errors = ",
        errors,
        " and dirtyFields = ",
        dirtyFields,
        " and isvalid = ",
        isValid,
    );
    return (
        <Card
            className={`text-center mx-auto w-50 text-wrap mt-5 pb-2 pr-2 pl-2 ${styles.sign_up_card}`}
        >
            <Card.Header className="fw-bold fs-4">
                <span className={`${styles.header_text}`}>
                    <FormattedMessage id="sign_up_form_title" />
                </span>
            </Card.Header>
            <Card.Body>
                <Form>
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
                                true &&
                                userNameWatch.length >= TEXT_FIELD_MIN_LENGTH
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
                                pattern: {
                                    message: "Cannot contain symbols",
                                    value: /^[^\W]+$/u,
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
                                        true &&
                                        passwordWatch.length >=
                                            TEXT_FIELD_MIN_LENGTH
                                    }
                                    {...register("password", {
                                        maxLength: {
                                            message: intl.formatMessage(
                                                {
                                                    id: "sign_up_form_password_max_length",
                                                },
                                                { length: PASSWORD_MAX_LENGTH },
                                            ),
                                            value: PASSWORD_MAX_LENGTH,
                                        },
                                        minLength: {
                                            message: intl.formatMessage(
                                                {
                                                    id: "sign_up_form_password_min_length",
                                                },
                                                { length: PASSWORD_MIN_LENGTH },
                                            ),
                                            value: PASSWORD_MIN_LENGTH,
                                        },
                                        required: {
                                            message: intl.formatMessage({
                                                id: "sign_up_form_password_required",
                                            }),
                                            value: true,
                                        },
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
                                    generateTooltip("tooltip", props, {
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
                                            : "outline-danger"
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
                            placeholder={intl.formatMessage({
                                id: "sign_up_form3_placeholder",
                            })}
                            type="password"
                            {...register("confirmPassword")}
                        />
                    </Form.Group>
                </Form>
                <Button
                    className={styles.sign_up_button}
                    variant="outline-primary mt-4 mx-auto"
                >
                    <FormattedMessage id="sign_up_form_submit_button" />
                </Button>
            </Card.Body>
        </Card>
    );
};
