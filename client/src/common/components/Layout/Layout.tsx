import {
    faBook,
    faBookAtlas,
    faClipboard,
    faDownload,
    faFileExport,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { type ReactNode } from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import type { Notification } from "src/@types";
import { NotificationContext } from "src/context/NotificationContext/NotificationContext";
import { generateTooltipIntl } from "src/helpers";

import { Notifications } from "../Notifications/Notifications";

type LayoutProps = {
    children: JSX.Element | ReactNode;
};

/**
 * @summary The Layout component, takes in no props and renders the overall layout of the application
 * @returns {JSX.Element} Layout component
 */
export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const router = useRouter();
    const [notifications, setNotifications] = React.useState<Notification[]>(
        [],
    );

    const navigationLinks = [
        <OverlayTrigger
            key="home-link"
            overlay={(props): JSX.Element =>
                generateTooltipIntl("tooltip", props, { type: "Home" })
            }
            placement="top"
        >
            <Button
                onClick={async (): Promise<void> => {
                    await router.push("/");
                }}
                title="Home Page"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faHome} />
            </Button>
        </OverlayTrigger>,

        <OverlayTrigger
            key="courses-link"
            overlay={(props): JSX.Element =>
                generateTooltipIntl("tooltip", props, {
                    type: "Courses",
                })
            }
            placement="top"
        >
            <Button
                onClick={async (): Promise<void> => {
                    await router.push("/courses");
                }}
                title="Courses"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faBook} />
            </Button>
        </OverlayTrigger>,

        <OverlayTrigger
            key="semesters-link"
            overlay={(props): JSX.Element =>
                generateTooltipIntl("tooltip", props, {
                    type: "Semesters",
                })
            }
            placement="top"
        >
            <Button
                onClick={async (): Promise<void> => {
                    await router.push("/semesters");
                }}
                title="Semesters"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faBookAtlas} />
            </Button>
        </OverlayTrigger>,
        <OverlayTrigger
            key="plans-link"
            overlay={(props): JSX.Element =>
                generateTooltipIntl("tooltip", props, { type: "Plans" })
            }
            placement="top"
        >
            <Button
                onClick={async (): Promise<void> => {
                    await router.push("/plans");
                }}
                title="Plans"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faClipboard} />
            </Button>
        </OverlayTrigger>,

        <OverlayTrigger
            key="imports-link"
            overlay={(props): JSX.Element =>
                generateTooltipIntl("tooltip", props, {
                    type: "Imports",
                })
            }
            placement="top"
        >
            <Button
                onClick={async (): Promise<void> => {
                    await router.push("/imports");
                }}
                title="File Import"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faDownload} />
            </Button>
        </OverlayTrigger>,
        <OverlayTrigger
            key="exports-link"
            overlay={(props): JSX.Element =>
                generateTooltipIntl("tooltip", props, {
                    type: "Exports",
                })
            }
            placement="top"
        >
            <Button
                onClick={async (): Promise<void> => {
                    await router.push("/exports");
                }}
                title="File Export"
                variant="outline-primary"
            >
                <FontAwesomeIcon icon={faFileExport} />
            </Button>
        </OverlayTrigger>,
    ];

    const notificationsMemo = React.useMemo(
        () => () => ({
            addNotification: (notification: Notification): void => {
                setNotifications((oldNotifications) => [
                    notification,
                    ...oldNotifications,
                ]);
            },
            deleteNotification: (index: number): void => {
                const notificationsClone = [...notifications].filter(
                    (_value, ind) => ind !== index,
                );
                setNotifications(notificationsClone);
            },
            notifications,
        }),
        [notifications],
    );

    return (
        <>
            <NotificationContext.Provider value={notificationsMemo()}>
                <Notifications />
                {children}
            </NotificationContext.Provider>
            <div className="d-flex flex-row justify-content-around pb-3 pt-3 bg-dark bg-gradient">
                {navigationLinks}
            </div>
        </>
    );
};
