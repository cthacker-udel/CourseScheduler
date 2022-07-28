import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger } from "react-bootstrap";
import { generateTooltip } from "src/helpers";

import styles from "./Sidebar.module.css";
/**
 * This is the Sidebar component, which will allow the user to navigate throughout the application with ease
 *
 * @returns The sidebar component, which houses the navigation
 */
export const Sidebar = (): JSX.Element => {
    const [isClosed, setIsClosed] = React.useState<boolean>(true);
    return (
        <div className={isClosed ? styles.sidebar_closed : styles.sidebar_open}>
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
                    className={`rounded ${styles.sidebar_toggle}`}
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
        </div>
    );
};
