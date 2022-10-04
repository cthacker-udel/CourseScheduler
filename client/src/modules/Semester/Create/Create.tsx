/* eslint-disable @typescript-eslint/no-floating-promises -- disabled for router */
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SemestersApi } from "src/api/client-side/SemestersApi";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";
import { SEMESTERS } from "src/enums";
import { generateNotification, getLoggedInUser, isApiError } from "src/helpers";
import { Logger } from "src/log/Logger";

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
    const router = useRouter();
    const { addNotification } = useNotificationContext();
    const { formState, handleSubmit, register, watch } = useForm<FormData>({
        defaultValues: {
            name: "",
            semester: SEMESTERS.SPRING,
            year: new Date(Date.now()).getUTCFullYear(),
        },
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { dirtyFields, errors } = formState;

    const yearWatch = watch("year");

    /**
     * Adds a semester to the database, if an error occurs, it reports it via the notification service
     *
     * @param data - The form data that will be used to populate and add a semester to the database
     */
    const addSemester = async (data: FormData): Promise<void> => {
        try {
            const { username } = getLoggedInUser();
            const result = await SemestersApi.addSemester({
                ...data,
                username,
            });
            if (isApiError(result)) {
                addNotification(
                    generateNotification(
                        "Failed to create semester",
                        "Semester Creation Failed",
                    ),
                );
            } else {
                router.push("/dashboard/semester");
            }
        } catch (error: unknown) {
            Logger.log("error", (error as Error).message);
        }
    };

    return (
        <Card
            className={`position-absolute ${styles.create_semester_card} text-center`}
        >
            <Card.Title className="p-4 fw-bold">{TEXT.CARD_TITLE}</Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit(addSemester)}>
                    <Form.Group controlId="semester-name">
                        <Form.Label className="w-100 text-start fw-bold ms-2">
                            {TEXT.FORM1_LABEL}
                        </Form.Label>
                        <Form.Control
                            className="w-50 me-auto"
                            isInvalid={dirtyFields.name && !!errors.name}
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
                            {`${TEXT.FORM2_LABEL} - ${
                                Number.isNaN(yearWatch) ? "Invalid" : yearWatch
                            }`}
                        </Form.Label>
                        <Form.Control
                            className="w-25 me-auto"
                            isInvalid={!!errors.year}
                            isValid={!errors.year}
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
                                validate: {
                                    isNotNan: (value) =>
                                        !Number.isNaN(value) ||
                                        VALIDATION_TEXT.year.invalid.isNaN,
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
                    <Button
                        className="mt-3"
                        disabled={
                            !!errors.name ||
                            !!errors.semester ||
                            !!errors.year ||
                            !dirtyFields.name
                        }
                        type="submit"
                        variant="primary"
                    >
                        {TEXT.BUTTON_TEXT}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
