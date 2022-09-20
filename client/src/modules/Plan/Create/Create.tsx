/* eslint-disable no-magic-numbers -- trivial number, not needed to be constant */
import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { FieldErrors, useForm } from "react-hook-form";
import type { Semester } from "src/@types";
import { PLAN_NAME } from "src/common";
import { MultiSelect } from "src/common/components/MultiSelect";
import semesters from "src/data/mockData/semester.json";
import { Logger } from "src/log/Logger";

import { TEXT } from "./CreateConstants";
import { CREATE_VALIDATION } from "./CreateValidation";

type FormData = {
    name: string;
    semesters: Semester[];
};

/**
 * Component for creating a plan
 *
 * @returns Create Plan Component
 */
export const Create = (): JSX.Element => {
    const { formState, handleSubmit, register, setValue } = useForm<FormData>({
        criteriaMode: "all",
        defaultValues: {
            name: "",
            semesters: [],
        },
        mode: "all",
        reValidateMode: "onChange",
    });
    const semester = semesters as Semester[];
    const [selectedSemesters, setSelectedSemesters] = React.useState<number[]>(
        [],
    );

    const { errors, dirtyFields } = formState;

    /**
     * Submit handler, which allows for us to add specific behavior to the form submit action
     *
     * @param data - The form data being submitted
     * @param event - The form submit event
     */
    const onSubmit = async (
        data: FormData,
        _event: React.BaseSyntheticEvent,
    ): void => {
        const { name, semesters } = data;
    };

    /**
     * Submit handler for when errors are present in submitted form, allows us to add specific behavior to this type of situation
     *
     * @param errors - The errors present in the form
     * @param event - The form submit event
     */
    const onError = (
        fieldErrors: FieldErrors<FormData>,
        _event: React.BaseSyntheticEvent,
    ): void => {
        Logger.log(
            "error",
            `Error creating plan: ${fieldErrors.name} ${fieldErrors.semesters}`,
            "Create.tsx",
            58,
        );
    };

    React.useEffect(() => {
        if (semester?.length) {
            setValue(
                "semesters",
                semester.filter((_, ind) => selectedSemesters.includes(ind)),
                { shouldDirty: true },
            );
        }
    }, [semester, selectedSemesters, setValue]);

    return (
        <div className="d-flex flex-row h-100 w-50 mx-auto align-items-center justify-content-center">
            <div className="d-flex flex-column">
                <Alert className="rounded mb-2" variant="primary">
                    {TEXT.header}
                </Alert>
                <hr />
                <Form
                    className="shadow p-3"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <div className="fw-bold fs-5 text-center border-bottom w-25 mx-auto">
                        {TEXT.formTitle}
                    </div>
                    <Form.Group className="mt-4" controlId="name-form">
                        <Form.Label className="fw-bold">
                            {TEXT.nameFormTitle}
                        </Form.Label>
                        <Form.Control
                            isInvalid={
                                Object.keys(errors).length > 0 &&
                                dirtyFields?.name
                            }
                            isValid={
                                Object.keys(errors).length === 0 &&
                                dirtyFields?.name
                            }
                            type="text"
                            {...register("name", {
                                maxLength: {
                                    message:
                                        CREATE_VALIDATION.NAME.MESSAGES.invalid
                                            .maxLength,
                                    value: CREATE_VALIDATION.NAME.VALUES
                                        .maxLength,
                                },
                                minLength: {
                                    message:
                                        CREATE_VALIDATION.NAME.MESSAGES.invalid
                                            .minLength,
                                    value: CREATE_VALIDATION.NAME.VALUES
                                        .minLength,
                                },
                                pattern: {
                                    message:
                                        CREATE_VALIDATION.NAME.MESSAGES.invalid
                                            .pattern,
                                    value: PLAN_NAME,
                                },
                            })}
                        />
                        {errors?.name?.message && dirtyFields?.name && (
                            <Form.Control.Feedback type="invalid">
                                {errors.name.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors?.name?.message && dirtyFields?.name && (
                            <Form.Control.Feedback type="valid">
                                {CREATE_VALIDATION.NAME.MESSAGES.valid}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mt-4" controlId="semester-form">
                        <Form.Label className="fw-bold w-100 text-center">
                            {TEXT.semesterFormTitle}
                        </Form.Label>
                        <MultiSelect
                            caret
                            displayItemField="title"
                            items={semester}
                            parentClassName="w-75 mx-auto"
                            pushSelectedItems={(indexes: number[]): void => {
                                setSelectedSemesters(indexes);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mt-4 d-flex flex-row justify-content-center">
                        <Button
                            className="w-25 rounded-pill"
                            disabled={
                                !dirtyFields.name || !dirtyFields.semesters
                            }
                            type="submit"
                            variant={
                                !dirtyFields.name || !dirtyFields.semesters
                                    ? "primary"
                                    : "outline-primary"
                            }
                        >
                            {TEXT.submitButtonText}
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};
