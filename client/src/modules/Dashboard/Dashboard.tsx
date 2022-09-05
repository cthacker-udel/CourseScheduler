import {
    faBook,
    faBookAtlas,
    faClipboard,
    faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { generateTooltip } from "src/helpers";

import styles from "./Dashboard.module.css";

/**
 * General dashboard for navigating between user applications
 *
 * @returns The dashboard component
 */
export const Dashboard = (): JSX.Element => {
    const router = useRouter();

    return (
        <div className="h-100 mx-auto w-50 d-flex flex-column align-items-center justify-content-center">
            <div className="fs-3 fw-bolder text-center mb-4 text-wrap border-bottom pb-1">
                {"Course Scheduler Dashboard"}
            </div>
            <div>
                <div className="d-flex flex-row">
                    <span
                        className="p-3"
                        onClick={async (): Promise<void> => {
                            await router.push("/dashboard/course");
                        }}
                    >
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                properties: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Courses", properties)
                            }
                            placement="left"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faBook}
                                size="3x"
                            />
                        </OverlayTrigger>
                    </span>
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                properties: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Semesters", properties)
                            }
                            placement="right"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faBookAtlas}
                                size="3x"
                            />
                        </OverlayTrigger>
                    </span>
                </div>
                <div className="d-flex flex-row">
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                properties: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Plans", properties)
                            }
                            placement="left"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faClipboard}
                                size="3x"
                            />
                        </OverlayTrigger>
                    </span>
                    <span className="p-3">
                        <OverlayTrigger
                            delay={{ hide: 100, show: 500 }}
                            overlay={(
                                properties: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Courses List", properties)
                            }
                            placement="right"
                        >
                            <FontAwesomeIcon
                                className={`p-5 border ${styles.dashboard_icon} rounded`}
                                icon={faRectangleList}
                                size="3x"
                            />
                        </OverlayTrigger>
                    </span>
                </div>
            </div>
        </div>
    );
};
