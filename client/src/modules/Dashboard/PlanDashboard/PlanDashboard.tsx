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

import styles from "./PlanDashboard.module.css";

/**
 * This is the plan dashboard which houses all the actions a user can take upon plans
 *
 * @returns The dashboard for managing plans
 */
export const PlanDashboard = (): JSX.Element => {
    const router = useRouter();
    return (
        <div className="h-75 d-flex flex-column justify-content-center align-items-center">
            <Alert className="text-center p-4" variant="info">
                <Alert.Heading className="text-decoration-underline fs-4 fw-bold">
                    {"Plan Dashboard"}
                </Alert.Heading>
                <span>
                    {
                        "This houses the general management of plans, the user can create, read, update existing plans, and delete plans from the options listed below"
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
                            "This is where you can create a custom plan. The plan is added to the collection after successfully adding it."
                        }
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/plan/create");
                        }}
                        variant="outline-success"
                    >
                        {"Create Plans"}
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
                            "This is where you can view about the details of a plan, it's courses, semesters, etc."
                        }
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/plan/read");
                        }}
                        variant="outline-secondary"
                    >
                        {"View Plans"}
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
                            "This is where you can edit a plan you created or already existing plans, allowing you to change anything about the plans, ranging from the courses to the semesters."
                        }
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/plan/update");
                        }}
                        variant="outline-primary"
                    >
                        {"Update Plans"}
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
                        {"This is where you can delete plans."}
                    </span>
                    <Button
                        className={`mt-4 w-75 mx-auto ${styles.alert_button}`}
                        onClick={async (): Promise<void> => {
                            await router.push("/plan/delete");
                        }}
                        variant="outline-warning"
                    >
                        {"Delete Plans"}
                    </Button>
                </Alert>
            </div>
        </div>
    );
};
