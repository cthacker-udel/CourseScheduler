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
import { Button, Navbar, Overlay, Tooltip } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Link, Outlet } from "react-router-dom";

type OverlayType =
    | "course"
    | "export"
    | "home"
    | "import"
    | "plan"
    | "semester";

/**
 * @summary The Layout component, takes in no props and renders the overall layout of the application
 * @returns {JSX.Element} Layout component
 */
export const Layout = (): JSX.Element => {
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
        <Link className="text-muted text-wrap" key="home-link" to="/dashboard">
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
        </Link>,
        <Link className="text-muted text-wrap" key="courses-link" to="/courses">
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
        </Link>,
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
        </Link>,
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
        </Link>,
        <Link className="text-muted text-wrap" key="imports-link" to="/imports">
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
        </Link>,
        <Link className="text-muted text-wrap" key="exports-link" to="/exports">
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
        </Link>,
    ];
    const overlays = [
        <Overlay
            key="course-overlay"
            placement="top"
            show={showOverlays._course}
            target={courseRef.current}
        >
            {(props): JSX.Element => (
                <Tooltip {...props}>
                    <FormattedMessage
                        id="tooltip"
                        values={{ type: "Courses" }}
                    />
                </Tooltip>
            )}
        </Overlay>,
        <Overlay
            key="semester-overlay"
            placement="top"
            show={showOverlays._semester}
            target={semesterRef.current}
        >
            {(props): JSX.Element => (
                <Tooltip {...props}>
                    <FormattedMessage
                        id="tooltip"
                        values={{ type: "Semesters" }}
                    />
                </Tooltip>
            )}
        </Overlay>,
        <Overlay
            key="plan-overlay"
            placement="top"
            show={showOverlays._plan}
            target={planRef.current}
        >
            {(props): JSX.Element => (
                <Tooltip {...props}>
                    <FormattedMessage id="tooltip" values={{ type: "Plans" }} />
                </Tooltip>
            )}
        </Overlay>,
        <Overlay
            key="home-overlay"
            placement="top"
            show={showOverlays._home}
            target={homeRef.current}
        >
            {(props): JSX.Element => (
                <Tooltip {...props}>
                    <FormattedMessage id="tooltip" values={{ type: "Home" }} />
                </Tooltip>
            )}
        </Overlay>,
        <Overlay
            key="export-overlay"
            placement="top"
            show={showOverlays._export}
            target={exportRef.current}
        >
            {(props): JSX.Element => (
                <Tooltip {...props}>
                    <FormattedMessage
                        id="tooltip"
                        values={{ type: "Exports" }}
                    />
                </Tooltip>
            )}
        </Overlay>,
        <Overlay
            key="import-overlay"
            placement="top"
            show={showOverlays._import}
            target={importRef.current}
        >
            {(props): JSX.Element => (
                <Tooltip {...props}>
                    <FormattedMessage
                        id="tooltip"
                        values={{ type: "Imports" }}
                    />
                </Tooltip>
            )}
        </Overlay>,
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
            {overlays}
        </>
    );
};
