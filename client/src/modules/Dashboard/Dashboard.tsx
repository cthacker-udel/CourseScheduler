import {
    faBook,
    faBookAtlas,
    faClipboard,
    faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { generateTooltip } from "src/helpers";

import styles from "./Dashboard.module.css";

/**
 * This component displays the dashboard
 *
 * @returns The dashboard
 */
export const Dashboard = (): JSX.Element => {
    const [randomState, setRandomState] = React.useState(false);
    return (
        <div className="d-flex flex-column h-100 justify-content-center align-items-center">
            <div className="fs-3 fw-bolder text-center mb-4 text-wrap">
                {"Course Scheduler Dashboard"}
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                props: OverlayInjectedProps,
                            ): JSX.Element => generateTooltip("Courses", props)}
                            placement="left"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faBook}
                            />
                        </OverlayTrigger>
                    </span>
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                props: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Semesters", props)
                            }
                            placement="right"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faBookAtlas}
                            />
                        </OverlayTrigger>
                    </span>
                </div>
                <div className="d-flex flex-row">
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                props: OverlayInjectedProps,
                            ): JSX.Element => generateTooltip("Plans", props)}
                            placement="left"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faClipboard}
                            />
                        </OverlayTrigger>
                    </span>
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                props: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Courses List", props)
                            }
                            placement="right"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faRectangleList}
                            />
                        </OverlayTrigger>
                    </span>
                </div>
            </div>
        </div>
    );
};
