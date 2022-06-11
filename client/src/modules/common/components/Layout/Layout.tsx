import {
    faBook,
    faBookAtlas,
    faClipboard,
    faDownload,
    faFileExport,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { FormattedMessage } from "react-intl";
import { Link, Outlet } from "react-router-dom";

import styles from "./Layout.module.css";

type OverlayType =
    | "course"
    | "export"
    | "home"
    | "import"
    | "plan"
    | "semester";

/**
 * This generates the OverlayTrigger's tooltip
 * @param fmtMessageId The ID of the formatted message
 * @param props The PopperJS props passed into the tooltip via the OverlayTrigger component
 * @param values The values of the formattedMessage that display the message
 * @returns {JSX.Element} The tooltip with given props, values, and id
 */
const generateTooltip = (
    fmtMessageId: string,
    props: OverlayInjectedProps,
    values: { [key: string]: string },
): JSX.Element => (
    <Tooltip
        {...props}
        className={styles.custom_tooltip_override}
        id={`${fmtMessageId}-${JSON.stringify(values)}`}
    >
        <FormattedMessage id={fmtMessageId} values={values} />
    </Tooltip>
);

/**
 * @summary The Layout component, takes in no props and renders the overall layout of the application
 * @returns {JSX.Element} Layout component
 */
const Layout = (): JSX.Element => {
    const homeRef = React.useRef(null);
    const courseRef = React.useRef(null);
    const semesterRef = React.useRef(null);
    const planRef = React.useRef(null);
    const exportRef = React.useRef(null);
    const importRef = React.useRef(null);
    const [showOverlays, setShowOverlays] = React.useState({
        _course: false,
        _export: false,
        _home: false,
        _import: false,
        _plan: false,
        _semester: false,
    });

    /**
     * @summary Toggles the overlay state via a set call to the consecutive overlay states
     * @param type The type of overlay to toggle
     * @param value The value to set the overlay state to
     */
    const toggleShowOverlay = (type: OverlayType, value: boolean): void => {
        switch (type) {
            case "home": {
                setShowOverlays({ ...showOverlays, _home: value });
                break;
            }
            case "course": {
                setShowOverlays({ ...showOverlays, _course: value });
                break;
            }
            case "semester": {
                setShowOverlays({ ...showOverlays, _semester: value });
                break;
            }
            case "plan": {
                setShowOverlays({ ...showOverlays, _plan: value });
                break;
            }
            case "export": {
                setShowOverlays({ ...showOverlays, _export: value });
                break;
            }
            case "import": {
                setShowOverlays({ ...showOverlays, _import: value });
                break;
            }
            default: {
                break;
            }
        }
    };

    const navigationLinks = [
        <OverlayTrigger
            key="home-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, { type: "Home" })
            }
            placement="top"
        >
            <Link className="text-muted text-wrap" to="/">
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("home", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("home", false);
                    }}
                    ref={homeRef}
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faHome} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="courses-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, { type: "Courses" })
            }
        >
            <Link
                className="text-muted text-wrap"
                key="courses-link"
                to="/courses"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("course", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("course", false);
                    }}
                    ref={courseRef}
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faBook} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="semester-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, { type: "Semesters" })
            }
        >
            <Link
                className="text-muted text-wrap"
                key="semesters-link"
                to="/semesters"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("semester", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("semester", false);
                    }}
                    ref={semesterRef}
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faBookAtlas} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="plans"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, { type: "Plans" })
            }
        >
            <Link className="text-muted text-wrap" key="plans-link" to="/plans">
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("plan", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("plan", false);
                    }}
                    ref={planRef}
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faClipboard} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="imports-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, { type: "Imports" })
            }
        >
            <Link
                className="text-muted text-wrap"
                key="imports-link"
                to="/imports"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("import", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("import", false);
                    }}
                    ref={importRef}
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faDownload} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="exports-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, { type: "Exports" })
            }
        >
            <Link
                className="text-muted text-wrap"
                key="exports-link"
                to="/exports"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("export", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("export", false);
                    }}
                    ref={exportRef}
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faFileExport} />
                </Button>
            </Link>
        </OverlayTrigger>,
    ];

    return (
        <>
            <div>
                <Outlet />
            </div>
            <div>
                {" "}
                <Navbar
                    bg="dark"
                    className="d-flex flex-row justify-content-around pt-3 pb-3"
                >
                    {navigationLinks}
                </Navbar>
            </div>
        </>
    );
};

export const exports = {
    Layout,
    generateTooltip,
};
