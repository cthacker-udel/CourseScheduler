import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
    Button,
    Card,
    Form,
    InputGroup,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import styles from "./SignUp.module.css";

/**
 * Sign-Up Page component, will communicate with back-end to sign user up and insert record into mongo database
 */
export const SignUp = (): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, formState } = useForm({
        defaultValues: {
            confirmPassword: "",
            password: "",
            username: "",
        },
        reValidateMode: "onBlur",
    });

    /**
     * This function generates the tooltip for the hide password button, which is conditional based on whether the password is shown or not.
     * @param props The properties injected by the PopperJS config
     * @param message The message the tooltip will contain
     * @returns
     */
    const renderPasswordTooltip = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Due to not importing OverlayTriggerProps properly from react-bootstrap dep
        props: any,
        message: string,
    ): JSX.Element => (
        <Tooltip id={message} {...props}>
            {message}
        </Tooltip>
    );

    const intl = useIntl();
    const { errors } = formState;
    console.log("errors = ", errors);
    return (
        <Card
            className={`text-center mx-auto w-50 text-wrap mt-5 ${styles.sign_up_card}`}
        >
            <Card.Header className="fw-bold fs-4">
                <span className={`${styles.header_text}`}>
                    <FormattedMessage id="sign_up_form_title" />
                </span>
            </Card.Header>
            <Card.Body>
                <Form.Group
                    className={`w-50 mx-auto mt-4 mb-3 ${styles.username_form}`}
                    controlId="username-sign-up-form"
                >
                    <Form.Label className="fw-bold mb-2 fs-5">
                        <FormattedMessage id="sign_up_form1_title" />
                    </Form.Label>
                    <Form.Control
                        placeholder={intl.formatMessage({
                            id: "sign_up_form1_placeholder",
                        })}
                        required
                        type="text"
                        {...register("username", {
                            pattern: {
                                message: intl.formatMessage({
                                    id: "sign_up_form1_input_validation_error",
                                }),
                                value: /[^\W]/gu,
                            },
                            required: intl.formatMessage({
                                id: "sign_up_form1_input_error_required",
                            }),
                            validate: (message: string) =>
                                !message.match(/[\W]/gu),
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
                    <InputGroup className="mx-auto w-50">
                        <Form.Control
                            {...register("password")}
                            placeholder={intl.formatMessage({
                                id: "sign_up_form2_placeholder",
                            })}
                            type={showPassword ? "text" : "password"}
                        />
                        <OverlayTrigger
                            overlay={(props): JSX.Element =>
                                renderPasswordTooltip(
                                    props,
                                    showPassword
                                        ? "Hide password"
                                        : "Show password",
                                )
                            }
                            placement="right"
                        >
                            <Button
                                onClick={(): void => {
                                    setShowPassword((oldValue) => !oldValue);
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
                    </InputGroup>
                </Form.Group>
                <Form.Group
                    className={`mt-5 mx-auto w-50 ${styles.confirm_password_form}`}
                >
                    <Form.Label className="fs-5 fw-bold">
                        <FormattedMessage id="sign_up_form3_label" />
                    </Form.Label>
                    <Form.Control
                        placeholder={intl.formatMessage({
                            id: "sign_up_form3_placeholder",
                        })}
                        type="password"
                        {...register("confirmPassword")}
                    />
                </Form.Group>
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
