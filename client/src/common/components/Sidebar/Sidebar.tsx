/* eslint-disable no-confusing-arrow -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable no-shadow -- disabled */
/* eslint-disable no-unused-vars  -- disabled */
/* eslint-disable no-magic-numbers -- disabled */
import {
    faBook,
    faBookAtlas,
    faCaretLeft,
    faCaretRight,
    faClipboard,
    faCoins,
    faDownload,
    faFileExport,
    faHome,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import { generateTooltip } from "src/helpers";

import styles from "./Sidebar.module.css";

const SIDEBAR_CONSTANTS = {
    DISPLAY_TIMEOUT: 2750,
    HEADER: "Options",
};

enum SIDEBAR_STATE {
    CLOSED = 0,
    OPEN = 1,
    NOT_TOUCHED = 2,
}

/**
 * This is the Sidebar component, which will allow the user to navigate throughout the application with ease
 *
 * @returns The sidebar component, which houses the navigation
 */
export const Sidebar = (): JSX.Element => {
    const [sidebarState, setSidebarState] = React.useState<SIDEBAR_STATE>(
        SIDEBAR_STATE.NOT_TOUCHED,
    );
    const router = useRouter();

    return (
        <div
            className={`position-absolute bg-light bg-opacity-75 ${
                sidebarState === SIDEBAR_STATE.OPEN
                    ? styles.sidebar_activated
                    : styles.sidebar_closed
            } ${styles.sidebar}`}
        >
            <div className={`position-absolute ${styles.sidebar_toggle}`}>
                <OverlayTrigger
                    overlay={(properties): JSX.Element =>
                        generateTooltip(
                            sidebarState === SIDEBAR_STATE.CLOSED ||
                                sidebarState === SIDEBAR_STATE.NOT_TOUCHED
                                ? "Reveal Options"
                                : "Close Options",
                            properties,
                        )
                    }
                    placement="right"
                >
                    <div
                        className="rounded border border-dark border-opacity-10 d-flex flex-row justify-content-center align-items-center p-2"
                        onClick={(): void => {
                            setSidebarState(
                                (): SIDEBAR_STATE =>
                                    sidebarState === SIDEBAR_STATE.OPEN
                                        ? SIDEBAR_STATE.CLOSED
                                        : SIDEBAR_STATE.OPEN,
                            );
                        }}
                        role="button"
                    >
                        <FontAwesomeIcon
                            className={styles.sidebar_toggle_icon}
                            icon={
                                sidebarState === SIDEBAR_STATE.NOT_TOUCHED ||
                                sidebarState === SIDEBAR_STATE.CLOSED
                                    ? faCaretRight
                                    : faCaretLeft
                            }
                        />
                    </div>
                </OverlayTrigger>
            </div>
            <div className="d-flex flex-column justify-content-start">
                <span className="text-center py-2 fw-bold text-decoration-underline border-2 border-secondary border-bottom">
                    {SIDEBAR_CONSTANTS.HEADER}
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon className="my-auto pe-1" icon={faHome} />
                    <span className="fw-bold">{"Home"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/courses");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon className="my-auto pe-1" icon={faBook} />
                    <span className="fw-bold">{"Courses"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/semesters");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon
                        className="my-auto pe-1"
                        icon={faBookAtlas}
                    />
                    <span className="fw-bold">{"Semesters"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/plans");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon
                        className="my-auto pe-1"
                        icon={faClipboard}
                    />
                    <span className="fw-bold">{"Plans"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/imports");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon
                        className="my-auto pe-1"
                        icon={faDownload}
                    />
                    <span className="fw-bold">{"Downloads"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/exports");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon
                        className="my-auto pe-1"
                        icon={faFileExport}
                    />
                    <span className="fw-bold">{"Exports"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/tokens");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon className="my-auto pe-1" icon={faCoins} />
                    <span className="fw-bold">{"Tokens"}</span>
                </span>
                <span
                    className={`${styles.sidebar_item} justify-content-center pt-2 border-bottom pb-2 text-center`}
                    onClick={async (): Promise<void> => {
                        await router.push("/login");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon
                        className="my-auto pe-1"
                        icon={faRightToBracket}
                    />
                    <span className="fw-bold">{"Login"}</span>
                </span>
            </div>
        </div>
    );
};
