/* eslint-disable @typescript-eslint/no-floating-promises -- disabled for router.push */
/* eslint-disable no-magic-numbers -- disabled for length comparison */
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CoursesApi } from "src/api/client-side/CoursesApi";
import { LabsApi } from "src/api/client-side/LabsApi";
import { MultiSelectSearch } from "src/common/components/MultiSelectSearch";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";
import { generateNotification, getLoggedInUser, isApiError } from "src/helpers";
import { useAllCourses } from "src/hooks";

import styles from "./Create.module.css";
import { TEXT, VALIDATION_TEXT, VALIDATION_VALUES } from "./CreateConstants";

/**
 * Type for the form data
 */
type CreateFormData = {
    breadthRequirements: string[];
    classSection: string;
    credits: number;
    description: string;
    lab: boolean;
    name: string;
    preRequisiteIds: string[];
    prefix: string;
    section: string;
};

/**
 * Interface for creating a course
 *
 * @returns The create course module
 */
export const Create = (): JSX.Element => {
    const router = useRouter();
    const [username, setUsername] = React.useState<string>("");
    const { formState, getValues, register, reset, setValue, watch } =
        useForm<CreateFormData>({
            defaultValues: {
                classSection: "0",
                credits: 0,
                description: "",
                lab: true,
                name: "",
                preRequisiteIds: [],
                prefix: "",
                section: "0",
            },
            mode: "all",
            reValidateMode: "onChange",
        });
    const { addNotification } = useNotificationContext();

    const { dirtyFields, errors, touchedFields } = formState;

    const [labWatch, nameWatch, sectionWatch] = watch([
        "lab",
        "name",
        "section",
    ]);

    const { courses } = useAllCourses({ username });

    React.useEffect(() => {
        const user = getLoggedInUser();
        setUsername(user.username);
    }, []);

    /**
     * Determines if there are any errors in the form before adding it to the database
     */
    const onSubmitHandler = React.useCallback(
        async (formData: CreateFormData) => {
            if (
                Object.keys(errors).length === 0 &&
                Object.keys(getValues).length > 0
            ) {
                if (formData.lab) {
                    const result = await LabsApi.addLab({ ...formData });
                    if (isApiError(result)) {
                        addNotification(
                            generateNotification(
                                "Unable to add lab",
                                "Lab Status",
                                undefined,
                                "error",
                            ),
                        );
                    } else {
                        addNotification(
                            generateNotification(
                                "Successfully added lab",
                                "Lab Status",
                                undefined,
                                "error",
                            ),
                        );
                    }
                }
                const result = await CoursesApi.addCourse(formData);
                if (isApiError(result)) {
                    addNotification(
                        generateNotification(
                            "Unable to add course",
                            "Course Status",
                            undefined,
                            "error",
                        ),
                    );
                } else {
                    addNotification(
                        generateNotification(
                            "Added course successfully!",
                            "Course Status",
                            undefined,
                            "success",
                        ),
                    );
                    reset();
                    setTimeout(() => {
                        router.push("../");
                    }, 1500);
                }
            }
        },
        [addNotification, errors, getValues, reset, router],
    );

    /**
     * Returns whether or not the button is disabled
     */
    const isButtonDisabled = React.useCallback(
        () =>
            Object.keys(errors).length > 0 ||
            Object.keys(dirtyFields).length === 0,
        [dirtyFields, errors],
    );

    return (
        <div
            className={`position-absolute m-4 ${styles.create_course_container}`}
        >
            <Card className="p-4 shadow rounded">
                <Card.Title className="fw-bold">{TEXT.CARD_TITLE}</Card.Title>
                <Card.Body>
                    <div
                        className={`d-flex flex-column justify-content-between ${styles.create_course_form}`}
                    >
                        <Form.Group className="p-2" controlId="course-name">
                            <Form.Label>{TEXT.FORM1_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={touchedFields.name && !!errors.name}
                                isValid={dirtyFields.name && !errors.name}
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
                                as="textarea"
                                isInvalid={
                                    touchedFields.description &&
                                    !!errors.description
                                }
                                isValid={
                                    dirtyFields.description &&
                                    !errors.description
                                }
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
                        <Form.Group className="p-2" controlId="course-prefix">
                            <Form.Label>{TEXT.FORM3_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={
                                    touchedFields.prefix && !!errors.prefix
                                }
                                isValid={touchedFields.prefix && !errors.prefix}
                                type="text"
                                {...register("prefix", {
                                    maxLength: {
                                        message:
                                            VALIDATION_TEXT.prefix.maxLength,
                                        value: VALIDATION_VALUES.prefix
                                            .maxLength,
                                    },
                                    pattern: {
                                        message: VALIDATION_TEXT.prefix.pattern,
                                        value: VALIDATION_VALUES.prefix.pattern,
                                    },
                                    required: {
                                        message:
                                            VALIDATION_TEXT.prefix.required,
                                        value: VALIDATION_VALUES.prefix
                                            .required,
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.prefix?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                {VALIDATION_TEXT.prefix.valid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="p-2" controlId="course-credits">
                            <Form.Label>{TEXT.FORM4_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={
                                    touchedFields.credits && !!errors.credits
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
                            <Form.Label>{TEXT.FORM5_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={
                                    touchedFields.section && !!errors.section
                                }
                                isValid={dirtyFields.section && !errors.section}
                                type="text"
                                {...register("section", {
                                    maxLength: {
                                        message:
                                            VALIDATION_TEXT.section.maxLength,
                                        value: VALIDATION_VALUES.section
                                            .maxLength,
                                    },
                                    pattern: {
                                        message:
                                            VALIDATION_TEXT.section.pattern,
                                        value: VALIDATION_VALUES.section
                                            .pattern,
                                    },
                                    required: {
                                        message:
                                            VALIDATION_TEXT.section.required,
                                        value: VALIDATION_VALUES.section
                                            .required,
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.section?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                {VALIDATION_TEXT.section.valid}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="p-2" controlId="class-section">
                            <Form.Label>{TEXT.FORM6_LABEL}</Form.Label>
                            <Form.Control
                                isInvalid={
                                    touchedFields.classSection &&
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
                                    validate: {
                                        ifLabDoesSectionExist: async (
                                            desiredLabSection: string,
                                        ) => {
                                            if (labWatch) {
                                                const result =
                                                    await LabsApi.doesSectionExist(
                                                        nameWatch,
                                                        sectionWatch,
                                                        desiredLabSection,
                                                    );
                                                return (
                                                    result ||
                                                    VALIDATION_TEXT.classSection
                                                        .alreadyExists
                                                );
                                            }
                                            return true;
                                        },
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
                                    {TEXT.FORM7_LABEL}
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
                        <Form.Group controlId="course-prereqs">
                            <Form.Label>{TEXT.FORM9_LABEL}</Form.Label>
                            <MultiSelectSearch
                                displayItemField="id"
                                items={courses}
                            />
                        </Form.Group>
                        <Button
                            className="w-25 mx-auto mt-3"
                            disabled={isButtonDisabled()}
                            onClick={async (): Promise<void> => {
                                await onSubmitHandler(getValues());
                            }}
                            variant={
                                isButtonDisabled()
                                    ? "primary"
                                    : "outline-primary"
                            }
                        >
                            {TEXT.BUTTON_TEXT}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};
