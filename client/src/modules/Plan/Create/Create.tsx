import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

/**
 * Component for creating a plan
 *
 * @returns Create Plan Component
 */
export const Create = (): JSX.Element => {
    const { register } = useForm({
        criteriaMode: "all",
        defaultValues: {},
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    return (
        <div className="d-flex flex-row h-100 w-50 mx-auto align-items-center justify-content-center">
            <Form>
                <Form.Group />
            </Form>
        </div>
    );
};
