import React from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAllCourses, useAllLabs } from "src/hooks";

import styles from "./create.module.css";
import { TEXT, VALIDATION_TEXT, VALIDATION_VALUES } from "./CreateConstants";

/**
 * Interface for creating a course
 *
 * @returns The create course module
 */
export const Create = (): JSX.Element => {
    const { formState, register, setValue, watch } = useForm({
        defaultValues: {
            classSection: "0",
            credits: 0,
            description: "",
            lab: true,
            name: "",
            preRequisites: [],
            section: -1,
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const { dirtyFields, errors } = formState;

    const [labWatch] = watch(["lab"]);

    const { courses } = useAllCourses();
    const { labs } = useAllLabs();

    return (
        <div className={`position-absolute ${styles.create_course_container}`}>
            <Card className="p-4 shadow rounded">
                <Card.Title>{TEXT.CARD_TITLE}</Card.Title>
                <Card.Body>
                    <Form
                        className={`d-flex flex-column justify-content-between ${styles.create_course_form}`}
                    >
                        <Form.Group className="p-2" controlId="course-name">
                            <Form.Label>{TEXT.FORM1_LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("name", {
                                    maxLength: {
                                        message: VALIDATION_TEXT.name.maxLength,
                                        value: VALIDATION_VALUES.name.maxLength,
                                    },
                                    required: {
                                        message: VALIDATION_TEXT.name.required,
                                        value: VALIDATION_VALUES.name.required,
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.name?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                {VALIDATION_TEXT.name.valid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="p-2"
                            controlId="course-description"
                        >
                            <Form.Label>{TEXT.FORM2_LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("description", {
                                    maxLength: {
                                        message:
                                            VALIDATION_TEXT.description
                                                .maxLength,
                                        value: VALIDATION_VALUES.description
                                            .maxLength,
                                    },
                                    required: {
                                        message:
                                            VALIDATION_TEXT.description
                                                .required,
                                        value: VALIDATION_VALUES.description
                                            .required,
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.description?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                {VALIDATION_TEXT.description.valid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="p-2" controlId="course-credits">
                            <Form.Label>{TEXT.FORM3_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={
                                    dirtyFields.credits && !!errors.credits
                                }
                                isValid={dirtyFields.credits && !errors.credits}
                                type="number"
                                {...register("credits", {
                                    max: {
                                        message: VALIDATION_TEXT.credits.max,
                                        value: VALIDATION_VALUES.credits.max,
                                    },
                                    min: {
                                        message: VALIDATION_TEXT.credits.min,
                                        value: VALIDATION_VALUES.credits.min,
                                    },
                                    required: {
                                        message:
                                            VALIDATION_TEXT.credits.required,
                                        value: VALIDATION_VALUES.credits
                                            .required,
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.credits?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                {VALIDATION_TEXT.credits.valid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="p-2" controlId="section">
                            <Form.Label>{TEXT.FORM4_LABEL}</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("section")}
                            />
                        </Form.Group>
                        <Form.Group className="p-2" controlId="class-section">
                            <Form.Label>{TEXT.FORM5_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={
                                    dirtyFields.classSection &&
                                    !!errors.classSection
                                }
                                isValid={
                                    dirtyFields.classSection &&
                                    !errors.classSection
                                }
                                type="text"
                                {...register("classSection", {
                                    maxLength: {
                                        message:
                                            VALIDATION_TEXT.classSection
                                                .maxLength,
                                        value: VALIDATION_VALUES.classSection
                                            .maxLength,
                                    },
                                    pattern: {
                                        message:
                                            VALIDATION_TEXT.classSection
                                                .pattern,
                                        value: VALIDATION_VALUES.classSection
                                            .pattern,
                                    },
                                    required: {
                                        message:
                                            VALIDATION_TEXT.classSection
                                                .required,
                                        value: VALIDATION_VALUES.classSection
                                            .required,
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.classSection?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                {VALIDATION_TEXT.classSection.valid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="p-2" controlId="lab-section">
                            <Form.Check>
                                <Form.Check.Label>
                                    {TEXT.FORM6_LABEL}
                                </Form.Check.Label>
                                <Form.Check.Input
                                    checked={labWatch}
                                    onChange={(): void => {
                                        setValue("lab", !labWatch, {
                                            shouldDirty: true,
                                        });
                                    }}
                                />
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId="lab-course">
                            <Form.Label>{TEXT.FORM7_LABEL}</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="course-prereqs">
                            <Form.Label>{TEXT.FORM8_LABEL}</Form.Label>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
