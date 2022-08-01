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
import { Logger } from "src/log/Logger";

import styles from "./Dashboard.module.css";

/**
 * General dashboard for navigating between user applications
 *
 * @returns The dashboard component
 */
export const Dashboard = (): JSX.Element => {
    const router = useRouter();

    React.useEffect(() => {
        /**
         * Prefetches all the routes
         */
        const preFetch = async (): Promise<void> => {
            await router.prefetch("/courses");
            await router.prefetch("/semesters");
            await router.prefetch("/plans");
            await router.prefetch("course-list");
        };
        preFetch()
            .then((): void => {
                Logger.log("info", "Fetched all routes for Dashboard.tsx");
            })
            .catch((error: unknown): void => {
                Logger.log("error", error);
            });
    }, [router]);

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
                                size="3x"
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
                                props: OverlayInjectedProps,
                            ): JSX.Element => generateTooltip("Plans", props)}
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
                                props: OverlayInjectedProps,
                            ): JSX.Element =>
                                generateTooltip("Courses List", props)
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
