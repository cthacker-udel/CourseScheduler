import React from "react";
import { Card } from "react-bootstrap";
import type { Course } from "src/@types";
import COURSES from "src/data/catalog.json";

import styles from "./Update.module.css";

type UpdateCourseProperties = {
    // Read Comment below about --> id?: string;
    _course?: Course;
};

/* If an id is passed through, fetch the course via GetServerSideProps and then pass it into course */

/**
 * This component houses the infrastructure for updating a course
 *
 * @param props - The properties of the Update component, regarding updating a course
 * @param props.course - The course either passed in manually or fetched in getServerSideProps
 * @returns - The update form for updating the course
 */
export const Update = ({ _course }: UpdateCourseProperties): JSX.Element => {
    const course = (COURSES as Course[])[0] as Course;

    return (
        <div className="d-flex flex-row justify-content-center align-items-center h-100">
            <Card bg="light" border="dark" className="p-4 rounded w-75">
                <Card.Header
                    className={`bg-transparent border-bottom fw-bold text-center ${styles.course_card_header}`}
                >
                    {`${course?.name ?? "Name N/A"}${course.number}-${
                        course.section
                    }`}
                </Card.Header>
                <Card.Body className={`mt-3 ${styles.course_card_body}`}>
                    <div className="d-flex flex-row">
                        <div className="pe-2">
                            <div className="d-flex flex-column bg-info px-1 pb-1 rounded bg-opacity-25 fw-bold me-2">
                                <span>{"D"}</span>
                                <span>{"E"}</span>
                                <span>{"S"}</span>
                                <span>{"C"}</span>
                            </div>
                        </div>
                        <span>
                            {course?.description ??
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                        </span>
                    </div>
                    <div className="d-flex flex-row"></div>
                </Card.Body>
            </Card>
        </div>
    );
};
