import {
    faBook,
    faBookAtlas,
    faClipboard,
    faDownload,
    faFileExport,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import { generateTooltip } from "src/helpers";

type LayoutProps = {
    children: JSX.Element | ReactNode;
};

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
export const Layout = ({ children }: LayoutProps): JSX.Element => {
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
            <Link className="text-muted text-wrap" href="/">
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("home", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("home", false);
                    }}
                    ref={homeRef}
                    title="Home Page"
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faHome} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="courses-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, {
                    type: "Courses",
                })
            }
        >
            <Link
                className="text-muted text-wrap"
                href="/courses"
                key="courses-link"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("course", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("course", false);
                    }}
                    ref={courseRef}
                    title="Courses"
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faBook} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="semester-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, {
                    type: "Semesters",
                })
            }
        >
            <Link
                className="text-muted text-wrap"
                href="/semesters"
                key="semesters-link"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("semester", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("semester", false);
                    }}
                    ref={semesterRef}
                    title="Semesters"
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
            <Link
                className="text-muted text-wrap"
                href="/plans"
                key="plans-link"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("plan", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("plan", false);
                    }}
                    ref={planRef}
                    title="Plans"
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faClipboard} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="imports-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, {
                    type: "Imports",
                })
            }
        >
            <Link
                className="text-muted text-wrap"
                href="/imports"
                key="imports-link"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("import", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("import", false);
                    }}
                    ref={importRef}
                    title="File Import"
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faDownload} />
                </Button>
            </Link>
        </OverlayTrigger>,
        <OverlayTrigger
            key="exports-link"
            overlay={(props): JSX.Element =>
                generateTooltip("tooltip", props, {
                    type: "Exports",
                })
            }
        >
            <Link
                className="text-muted text-wrap"
                href="/exports"
                key="exports-link"
            >
                <Button
                    onMouseEnter={(): void => {
                        toggleShowOverlay("export", true);
                    }}
                    onMouseLeave={(): void => {
                        toggleShowOverlay("export", false);
                    }}
                    ref={exportRef}
                    title="File Export"
                    variant="outline-primary"
                >
                    <FontAwesomeIcon icon={faFileExport} />
                </Button>
            </Link>
        </OverlayTrigger>,
    ];

    return (
        <>
            <div>{children}</div>
            <div className="d-flex flex-row justify-content-around pb-3 pt-3 bg-dark bg-gradient">
                {navigationLinks}
            </div>
        </>
    );
};
