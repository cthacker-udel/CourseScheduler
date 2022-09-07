import {
    faBookOpenReader,
    faCirclePlus,
    faPencil,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, OverlayTrigger } from "react-bootstrap";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { generateTooltip } from "src/helpers";

import styles from "./SemesterDashboard.module.css";

const TEXT_CONSTANTS = {
    CREATE_DESCRIPTION:
        "This is where you can create a semester, and add in all the details before creation to tailor your requirements for the semester.",
    CREATE_TOOLTIP: "Create Semester(s)",
    DASHBOARD_TITLE: "Semester Dashboard",
    DASHBOARD_TITLE_DESCRIPTION: (
        <span>
            <span>
                {
                    "Welcome to the Semester Dashboard! This contains all the options you can utilize. You are able to "
                }
            </span>
            <span className="fw-bold">{"Create a Semester"}</span>
            <span>{", "}</span>
            <span className="fw-bold">{"Edit a Semester"}</span>
            <span>{", "}</span>
            <span className="fw-bold">{"View a Semester"}</span>
            <span>{", and "}</span>
            <span className="fw-bold">{"Delete a Semester"}</span>
            <span>{"."}</span>
        </span>
    ),
    DELETE_DESCRIPTION:
        "This is where you can delete a semester or semesters, all of the semesters you currently have registered are listed on this page",
    DELETE_TOOLTIP: "Delete Semester(s)",
    EDIT_DESCRIPTION:
        "This is where you can edit a semester, change all the details to your requirements, the changes are reflected immediately",
    EDIT_TOOLTIP: "Edit Semester(s)",
    VIEW_DESCRIPTION:
        "This is where you can view semesters, all of the semesters you currently have registered under your account",
    VIEW_TOOLTIP: "View Semester(s)",
};

/**
 * The semester dashboard, which houses all the options for semesters, mostly the CRUD operations, which are create, read, update, and delete
 *
 * @returns The semester dashboard
 */
export const SemesterDashboard = (): JSX.Element => (
    <div className="mx-auto w-75 d-flex flex-column justify-content-center h-100 align-items-center">
        <Alert
            className="d-flex flex-column text-center mb-5"
            variant="primary"
        >
            <span className="fs-5 fw-bold border-2 border-primary border-opacity-75 border-start-0 border-end-0 border-top-0 border-bottom mb-2 pb-1 w-25 mx-auto">
                {TEXT_CONSTANTS.DASHBOARD_TITLE}
            </span>
            <span className="fw-light">
                {TEXT_CONSTANTS.DASHBOARD_TITLE_DESCRIPTION}
            </span>
        </Alert>
        <div className="d-flex flex-row w-100 justify-content-around">
            <Alert
                className="d-flex flex-column mx-3 justify-content-between"
                variant="success"
            >
                <Alert.Heading className="fw-bold text-center fs-5">
                    <span className="mb-1">{"Create"}</span>
                    <FontAwesomeIcon
                        className="my-auto ms-1"
                        icon={faCirclePlus}
                    />
                    <hr />
                </Alert.Heading>
                <div className="text-wrap fw-light">
                    {TEXT_CONSTANTS.CREATE_DESCRIPTION}
                </div>
                <OverlayTrigger
                    delay={{ hide: 250, show: 250 }}
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        generateTooltip(
                            TEXT_CONSTANTS.CREATE_TOOLTIP,
                            properties,
                        )
                    }
                    placement="bottom"
                >
                    <Button
                        className={`d-flex flex-row mx-auto mt-4 ${styles.alert_button} w-25 rounded`}
                        variant="outline-success"
                    >
                        <FontAwesomeIcon
                            className="my-auto mx-auto"
                            icon={faPlus}
                        />
                    </Button>
                </OverlayTrigger>
            </Alert>
            <Alert
                className="d-flex flex-column mx-3 justify-content-between"
                variant="warning"
            >
                <Alert.Heading className="fw-bold text-center fs-5">
                    <span className="mb-1">{"Edit"}</span>
                    <FontAwesomeIcon className="my-auto ms-1" icon={faPencil} />
                    <hr />
                </Alert.Heading>
                <div className="text-wrap fw-light">
                    {TEXT_CONSTANTS.EDIT_DESCRIPTION}
                </div>
                <OverlayTrigger
                    delay={{ hide: 250, show: 250 }}
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        generateTooltip(TEXT_CONSTANTS.EDIT_TOOLTIP, properties)
                    }
                    placement="bottom"
                >
                    <Button
                        className={`d-flex flex-row mx-auto mt-4 ${styles.alert_button} w-25 rounded`}
                        variant="outline-warning"
                    >
                        <FontAwesomeIcon
                            className="my-auto mx-auto"
                            icon={faPencil}
                        />
                    </Button>
                </OverlayTrigger>
            </Alert>
            <Alert
                className="d-flex flex-column mx-3 justify-content-between"
                variant="primary"
            >
                <Alert.Heading className="fw-bold text-center fs-5">
                    <span className="mb-1">{"View"}</span>
                    <FontAwesomeIcon
                        className="my-auto ms-1"
                        icon={faBookOpenReader}
                    />
                    <hr />
                </Alert.Heading>
                <div className="text-wrap fw-light">
                    {TEXT_CONSTANTS.VIEW_DESCRIPTION}
                </div>
                <OverlayTrigger
                    delay={{ hide: 250, show: 250 }}
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        generateTooltip(TEXT_CONSTANTS.VIEW_TOOLTIP, properties)
                    }
                    placement="bottom"
                >
                    <Button
                        className={`d-flex flex-row mx-auto mt-4 ${styles.alert_button} w-25 rounded`}
                        variant="outline-primary"
                    >
                        <FontAwesomeIcon
                            className="my-auto mx-auto"
                            icon={faBookOpenReader}
                        />
                    </Button>
                </OverlayTrigger>
            </Alert>
            <Alert
                className="d-flex flex-column mx-3 justify-content-between"
                variant="danger"
            >
                <Alert.Heading className="fw-bold text-center fs-5">
                    <span className="mb-1">{"View"}</span>
                    <FontAwesomeIcon className="my-auto ms-1" icon={faTrash} />
                    <hr />
                </Alert.Heading>
                <div className="text-wrap fw-light">
                    {TEXT_CONSTANTS.DELETE_DESCRIPTION}
                </div>
                <OverlayTrigger
                    delay={{ hide: 250, show: 250 }}
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        generateTooltip(
                            TEXT_CONSTANTS.DELETE_TOOLTIP,
                            properties,
                        )
                    }
                    placement="bottom"
                >
                    <Button
                        className={`d-flex flex-row mx-auto mt-4 ${styles.alert_button} w-25 rounded`}
                        variant="outline-danger"
                    >
                        <FontAwesomeIcon
                            className="my-auto mx-auto"
                            icon={faTrash}
                        />
                    </Button>
                </OverlayTrigger>
            </Alert>
        </div>
    </div>
);
