import {
    faBookOpenReader,
    faCirclePlus,
    faPen,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { Alert, Button } from "react-bootstrap";

import styles from "./CourseDashboard.module.css";

/**
 * This is the course dashboard which houses all the actions a user can take upon courses
 *
 * @returns The dashboard for managing courses
 */
export const CourseDashboard = (): JSX.Element => {
    const router = useRouter();
    return (
        <div className="h-75 d-flex flex-column justify-content-center align-items-center">
            <Alert className="text-center p-4" variant="info">
                <Alert.Heading className="text-decoration-underline fs-4 fw-bold">
                    {"Course Dashboard"}
                </Alert.Heading>
                <span>
                    {
                        "This houses the general management of courses, the user can create, read, update existing courses, and delete courses from the options listed below"
                    }
                </span>
            </Alert>
            <div className="w-75 mx-auto mt-5 d-flex flex-row justify-content-around">
                <Alert
                    className={`${styles.option_card} my-auto me-3 d-flex flex-column`}
                    variant="success"
                >
                    <Alert.Heading className="text-center">
                        {"Create"}
                        <FontAwesomeIcon
                            className="my-auto ms-2"
                            icon={faCirclePlus}
                        />
                    </Alert.Heading>
                    <hr />
                    <span className="text-wrap">
                        {
                            "This is where you can create a custom course. The course is added to the collection after successfully adding it, and can be added to your plan afterwards."
                        }
                    </span>
                    <Button
                        className="w-75 mx-auto mt-4"
                        onClick={async (): Promise<void> => {
                            await router.push("/courses/create");
                        }}
                        variant="outline-success"
                    >
                        {"Create Courses"}
                    </Button>
                </Alert>
                <Alert
                    className={`${styles.option_card} my-auto mx-3 d-flex flex-column`}
                    variant="secondary"
                >
                    <Alert.Heading className="text-center">
                        {"Read"}
                        <FontAwesomeIcon
                            className="ms-2 my-auto"
                            icon={faBookOpenReader}
                        />
                    </Alert.Heading>
                    <hr />
                    <span className="text-wrap">
                        {
                            "This is where you can read about the details of a course, it's pre-requisites, it's description, etc."
                        }
                    </span>
                    <Button
                        className="w-75 mx-auto mt-4"
                        onClick={async (): Promise<void> => {
                            await router.push("/courses/read");
                        }}
                        variant="outline-secondary"
                    >
                        {"View Courses"}
                    </Button>
                </Alert>
                <Alert
                    className={`${styles.option_card} my-auto mx-3 d-flex flex-column`}
                    variant="primary"
                >
                    <Alert.Heading className="text-center">
                        {"Update"}
                        <FontAwesomeIcon
                            className="ms-2 my-auto"
                            icon={faPen}
                        />
                    </Alert.Heading>
                    <hr />
                    <span className="text-wrap">
                        {
                            "This is where you can edit a course you created or already existing courses, allowing you to change anything about the courses, ranging from the name to the credits, to the pre-requisites."
                        }
                    </span>
                    <Button
                        className="mt-4 w-75 mx-auto"
                        onClick={async (): Promise<void> => {
                            await router.push("/courses/update");
                        }}
                        variant="outline-primary"
                    >
                        {"Update Courses"}
                    </Button>
                </Alert>
                <Alert
                    className={`${styles.option_card} my-auto ms-3 d-flex flex-column`}
                    variant="warning"
                >
                    <Alert.Heading className="text-center">
                        {"Delete"}
                        <FontAwesomeIcon
                            className="ms-2 my-auto"
                            icon={faTrashCan}
                        />
                    </Alert.Heading>
                    <hr />
                    <span className="text-wrap">
                        {
                            "This is where you can delete courses, affecting all the other courses in your list."
                        }
                    </span>
                    <Button
                        className="mt-4 w-75 mx-auto"
                        onClick={async (): Promise<void> => {
                            await router.push("/courses/delete");
                        }}
                        variant="outline-warning"
                    >
                        {"Delete Courses"}
                    </Button>
                </Alert>
            </div>
        </div>
    );
};
