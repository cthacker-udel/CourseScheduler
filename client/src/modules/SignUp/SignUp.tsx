import React from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

/**
 * Sign-Up Page component, will communicate with back-end to sign user up and insert record into mongo database
 */
export const SignUp = (): JSX.Element => {
    const { register, formState } = useForm({
        defaultValues: {
            confirmPassword: "",
            password: "",
            username: "",
        },
        reValidateMode: "onBlue",
    });
    const intl = useIntl();
    const { errors } = formState;
    console.log("errors = ", errors);
    return (
        <Card className="text-center mx-auto w-75 text-wrap mt-5">
            <Card.Header className="fw-bold fs-4">
                <FormattedMessage id="sign_up_form_title" />
            </Card.Header>
            <Card.Body>
                <Form.Group
                    className="w-50 mx-auto mt-5"
                    controlId="username-sign-up-form"
                >
                    <Form.Label className="fw-bold mb-2 fs-5 text-decoration-underline">
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
            </Card.Body>
        </Card>
    );
};
