import React from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAllLabs } from "src/hooks/useAllLabs";

import styles from "./create.module.css";
import { TEXT } from "./CreateConstants";

/**
 * Interface for creating a course
 *
 * @returns The create course module
 */
export const Create = (): JSX.Element => {
    const { register, setValue, watch } = useForm({
        defaultValues: {
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
                            <Form.Control type="text" {...register("name")} />
                        </Form.Group>
                        <Form.Group
                            className="p-2"
                            controlId="course-description"
                        >
                            <Form.Label>{TEXT.FORM2_LABEL}</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("description")}
                            />
                        </Form.Group>
                        <Form.Group className="p-2" controlId="course-credits">
                            <Form.Label>{TEXT.FORM3_LABEL}</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("credits")}
                            />
                        </Form.Group>
                        <Form.Group className="p-2" controlId="section">
                            <Form.Label>{TEXT.FORM4_LABEL}</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("section")}
                            />
                        </Form.Group>
                        <Form.Group className="p-2" controlId="lab-section">
                            <Form.Check>
                                <Form.Check.Label>
                                    {TEXT.FORM5_LABEL}
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
                            <Form.Label>{TEXT.FORM6_LABEL}</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="course-prereqs">
                            <Form.Label>{TEXT.FORM7_LABEL}</Form.Label>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
