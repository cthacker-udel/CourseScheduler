/* eslint-disable no-magic-numbers -- trivial number, not needed to be constant */
import React from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { Semester } from "src/@types";
import { PLAN_NAME } from "src/common";
import { MultiSelect } from "src/common/components/MultiSelect";
import semesters from "src/data/mockData/semester.json";

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
    const { formState, register, setValue } = useForm<FormData>({
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

    React.useEffect(() => {
        if (semester?.length) {
            setValue(
                "semesters",
                semester.filter((_, ind) => selectedSemesters.includes(ind)),
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
                <Form className="shadow p-3">
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
                        <Form.Label className="fw-bold">
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
                </Form>
            </div>
        </div>
    );
};
