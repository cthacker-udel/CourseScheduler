import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SEMESTERS } from "src/enums";

import styles from "./Create.module.css";
import { TEXT, VALIDATION_TEXT, VALIDATION_VALUES } from "./CreateConstants";

type FormData = {
    name: string;
    semester: SEMESTERS;
    year: number;
};

const SEASONS = [
    SEMESTERS.SPRING,
    SEMESTERS.SUMMER,
    SEMESTERS.FALL,
    SEMESTERS.WINTER,
];

const SEASON_TEXT = ["Spring", "Summer", "Fall", "Winter"];

/**
 * Component for creating a semester
 *
 * @returns Interface to create a semester
 */
export const Create = (): JSX.Element => {
    const { formState, register, watch } = useForm<FormData>({
        defaultValues: {
            name: "",
            semester: SEMESTERS.SPRING,
            year: new Date(Date.now()).getUTCFullYear(),
        },
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { dirtyFields, errors } = formState;
    console.log(errors);

    const yearWatch = watch("year");

    return (
        <Card
            className={`position-absolute ${styles.create_semester_card} text-center`}
        >
            <Card.Title className="p-4 fw-bold">{TEXT.CARD_TITLE}</Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group controlId="semester-name">
                        <Form.Label className="w-100 text-start fw-bold ms-2">
                            {TEXT.FORM1_LABEL}
                        </Form.Label>
                        <Form.Control
                            className="w-50 me-auto"
                            isInvalid={dirtyFields.name && errors.name}
                            isValid={dirtyFields.name && !errors.name}
                            type="text"
                            {...register("name", {
                                maxLength: {
                                    message:
                                        VALIDATION_TEXT.name.invalid.length,
                                    value: VALIDATION_VALUES.name.length,
                                },
                                pattern: {
                                    message: VALIDATION_TEXT.name.invalid.regex,
                                    value: VALIDATION_VALUES.name.regex,
                                },
                                required: {
                                    message:
                                        VALIDATION_TEXT.name.invalid.required,
                                    value: VALIDATION_VALUES.name.required,
                                },
                            })}
                        />
                        <Form.Control.Feedback
                            className="text-start"
                            type="invalid"
                        >
                            {errors?.name?.message}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback
                            className="text-start"
                            type="valid"
                        >
                            {VALIDATION_TEXT.name.valid}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="semester-year">
                        <Form.Label className="w-100 text-start fw-bold ms-2">
                            {`${TEXT.FORM2_LABEL} - ${yearWatch}`}
                        </Form.Label>
                        <Form.Control
                            className="w-25 me-auto"
                            isInvalid={!!errors.year}
                            isValid={!!!errors.year}
                            type="number"
                            {...register("year", {
                                max: {
                                    message:
                                        VALIDATION_TEXT.year.invalid.maximum,
                                    value: VALIDATION_VALUES.year.maximum,
                                },
                                min: {
                                    message:
                                        VALIDATION_TEXT.year.invalid.negative,
                                    value: 0,
                                },
                                valueAsNumber: true,
                            })}
                        />
                        <Form.Control.Feedback
                            className="text-start"
                            type="invalid"
                        >
                            {errors?.year?.message}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback
                            className="text-start"
                            type="valid"
                        >
                            {VALIDATION_TEXT.year.valid}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="semester-season">
                        <Form.Label className="fw-bold text-start w-100 ms-2">
                            {TEXT.FORM3_LABEL}
                        </Form.Label>
                        <Form.Select className="w-25" {...register("semester")}>
                            {SEASONS.map((eachSeason) => (
                                <option key={eachSeason} value={eachSeason}>
                                    {SEASON_TEXT[eachSeason]}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <hr />
                    <Button className="mt-3" variant="primary">
                        {TEXT.BUTTON_TEXT}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
