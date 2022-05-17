/* eslint-disable react/jsx-props-no-spreading -- Disabled because overlay passes in lots of popper.js props, don't need to map them out directly */
import React, { ReactNode } from "react";
import { Button, Navbar, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBook,
    faClipboard,
    faBookAtlas,
    faDownload,
    faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";

type OverlayType =
    | "course"
    | "export"
    | "home"
    | "import"
    | "plan"
    | "semester";

interface LayoutProps {
    children: ReactNode;
    footer?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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

    const toggleShowOverlay = (type: OverlayType, value: boolean) => {
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
        <Link className="text-muted text-wrap" key="home-link" to="/home">
            <Button
                onMouseEnter={() => {
                    toggleShowOverlay("home", true);
                }}
                onMouseLeave={() => {
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
                onMouseEnter={() => {
                    toggleShowOverlay("course", true);
                }}
                onMouseLeave={() => {
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
                onMouseEnter={() => {
                    toggleShowOverlay("semester", true);
                }}
                onMouseLeave={() => {
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
                onMouseEnter={() => {
                    toggleShowOverlay("plan", true);
                }}
                onMouseLeave={() => {
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
                onMouseEnter={() => {
                    toggleShowOverlay("import", true);
                }}
                onMouseLeave={() => {
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
                onMouseEnter={() => {
                    toggleShowOverlay("export", true);
                }}
                onMouseLeave={() => {
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
            {(props) => (
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
            {(props) => (
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
            {(props) => (
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
            {(props) => (
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
            {(props) => (
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
            {(props) => (
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
            <div>{children}</div>
            <div>
                {" "}
                <Navbar
                    bg="dark"
                    className="d-flex flex-row justify-content-around pt-3 pb-3"
                    fixed="bottom"
                >
                    {navigationLinks}
                </Navbar>
            </div>
            {overlays}
        </>
    );
};
