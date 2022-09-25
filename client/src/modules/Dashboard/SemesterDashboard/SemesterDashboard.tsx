/* eslint-disable @typescript-eslint/no-floating-promises -- disabled for this */
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

import styles from "./SemesterDashboard.module.css";

/**
 * This is the semester dashboard which houses all the actions a user can take upon semesters
 *
 * @returns The dashboard for managing semesters
 */
export const SemesterDashboard = (): JSX.Element => {
    const router = useRouter();
    return (
        <div className="h-75 d-flex flex-column justify-content-center align-items-center">
            <Alert className="text-center p-4" variant="info">
                <Alert.Heading className="text-decoration-underline fs-4 fw-bold">
                    {"Semester Dashboard"}
                </Alert.Heading>
                <span>
                    {
                        "This houses the general management of semesters, the user can create, read, update existing semesters, and delete semesters from the options listed below"
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
                            "This is where you can create a custom semester. The semester is added to the collection after successfully adding it."
                        }
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={(): void => {
                            router.push("/semester/create");
                        }}
                        variant="outline-success"
                    >
                        {"Create Semesters"}
                    </Button>
                </Alert>
                <Alert
                    className={`${styles.option_card} my-auto mx-3 d-flex flex-column`}
                    variant="secondary"
                >
                    <Alert.Heading className="text-center">
                        {"View"}
                        <FontAwesomeIcon
                            className="ms-2 my-auto"
                            icon={faBookOpenReader}
                        />
                    </Alert.Heading>
                    <hr />
                    <span className="text-wrap">
                        {
                            "This is where you can view about the details of a semester, it's courses, semesters, etc."
                        }
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/semesters/read");
                        }}
                        variant="outline-secondary"
                    >
                        {"View Semesters"}
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
                            "This is where you can edit a semester you created or already existing semesters, allowing you to change anything about the semesters, ranging from the courses to the semesters."
                        }
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/semesters/update");
                        }}
                        variant="outline-primary"
                    >
                        {"Update Semesters"}
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
                        {"This is where you can delete semesters."}
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/semesters/delete");
                        }}
                        variant="outline-warning"
                    >
                        {"Delete Semesters"}
                    </Button>
                </Alert>
            </div>
        </div>
    );
};
