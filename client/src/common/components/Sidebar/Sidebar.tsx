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
    HEADER: "Options",
};

/**
 * This is the Sidebar component, which will allow the user to navigate throughout the application with ease
 *
 * @returns The sidebar component, which houses the navigation
 */
export const Sidebar = (): JSX.Element => {
    const [isClosed, setIsClosed] = React.useState<boolean>(true);
    const router = useRouter();
    return (
        <>
            <span
                className={`${
                    isClosed ? styles.sidebar_closed : styles.sidebar_open
                }`}
            >
                <OverlayTrigger
                    overlay={(props): JSX.Element =>
                        generateTooltip(
                            isClosed ? "Reveal Options" : "Close Options",
                            props,
                        )
                    }
                    placement="right"
                >
                    <div
                        className={`rounded ${styles.sidebar_toggle} border border-dark border-opacity-10`}
                        onClick={(): void => {
                            setIsClosed((oldIsClosed) => !oldIsClosed);
                        }}
                        role="button"
                    >
                        <FontAwesomeIcon
                            className={styles.sidebar_toggle_icon}
                            icon={isClosed ? faCaretRight : faCaretLeft}
                        />
                    </div>
                </OverlayTrigger>
            </span>
            <div
                className={
                    isClosed
                        ? styles.sidebar_content_closed
                        : styles.sidebar_content_open
                }
            >
                <span className="text-center py-2 fw-bold text-decoration-underline border-2 border-secondary border-bottom">
                    {SIDEBAR_CONSTANTS.HEADER}
                </span>
                <span
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
                    onClick={async (): Promise<void> => {
                        await router.push("/");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon className="my-auto pe-1" icon={faHome} />
                    <span className="fw-bold">{"Home"}</span>
                </span>
                <span
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
                    onClick={async (): Promise<void> => {
                        await router.push("/courses");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon className="my-auto pe-1" icon={faBook} />
                    <span className="fw-bold">{"Courses"}</span>
                </span>
                <span
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
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
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
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
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
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
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
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
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
                    onClick={async (): Promise<void> => {
                        await router.push("/tokens");
                    }}
                    role="button"
                >
                    <FontAwesomeIcon className="my-auto pe-1" icon={faCoins} />
                    <span className="fw-bold">{"Tokens"}</span>
                </span>
                <span
                    className={`${styles.sidebar_individual_content} d-flex flex-row justify-content-center pt-2 border-bottom pb-2`}
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
        </>
    );
};
