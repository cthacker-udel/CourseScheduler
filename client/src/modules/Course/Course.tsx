/* eslint-disable multiline-ternary -- failing for ternary below, determine to fix later */
/* eslint-disable react/jsx-no-useless-fragment -- just for testing*/
import React from "react";
import { Badge, Card, Container } from "react-bootstrap";
import type { MockCourse } from "src/@types";
import { useMockData } from "src/hooks/useMockData";

import styles from "./CoursePage.module.css";

const MOCK_COURSE_INDEX = 0;
const DATA_NAME_SPLIT_INDEX = 1;
const DATA_LENGTH_CHECK = 0;
const BADGE_VARIANT_OFFSET = 1;
const BADGE_VARIANTS = ["primary", "info", "warning", "danger"];
const CREDIT_PLURAL_TRIGGER = 1;

const CONSTANT_STRINGS = {
    description: "Description",
    name: "Name",
    prereq: "Pre-Requisites:",
    title: "Title",
};

/**
 * The course component, which will render each individual course
 * @returns {JSX.Element} The singular course
 */
const Course = (): JSX.Element => {
    const data: MockCourse = useMockData()[MOCK_COURSE_INDEX];
    const { credits } = data;
    const parsedCredits = Number.parseInt(credits, 10);
    const { description, id, preRequisites } = data;
    return (
        <Container fluid>
            <Card className={`w-50 mx-auto mt-5 ${styles.course_block}`}>
                <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-around">
                        <span className="fw-bold fs-6 d-flex flex-column justify-content-around h-100">
                            <span className="p-1 text-wrap">{`${CONSTANT_STRINGS.title}: ${id}`}</span>
                            <span className="p-1 text-wrap">
                                {`${CONSTANT_STRINGS.name}: ${
                                    data.name.split(" - ")[
                                        DATA_NAME_SPLIT_INDEX
                                    ]
                                }`}
                            </span>
                            <span className="p-1 text-wrap">
                                {`${CONSTANT_STRINGS.description}: ${
                                    description.length > DATA_LENGTH_CHECK
                                        ? description
                                        : "No description available"
                                }`}
                            </span>
                            <span className="p-1 text-wrap">
                                {`${CONSTANT_STRINGS.prereq}: ${
                                    preRequisites.length > DATA_LENGTH_CHECK
                                        ? preRequisites
                                        : "No Pre-Requisites for course"
                                }`}
                            </span>
                        </span>
                        <span>
                            <Badge
                                bg={
                                    BADGE_VARIANTS[
                                        parsedCredits - BADGE_VARIANT_OFFSET
                                    ]
                                }
                                className="me-1"
                                pill
                            >
                                {credits}
                            </Badge>
                            {parsedCredits === CREDIT_PLURAL_TRIGGER
                                ? "credit"
                                : "credits"}
                        </span>
                    </Card.Title>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Course;
