import React, { type ReactNode } from "react";
import type { Notification } from "src/@types";
import { NotificationContext } from "src/context/NotificationContext/NotificationContext";

import { Notifications } from "../Notifications/Notifications";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

type LayoutProps = {
    children: JSX.Element | ReactNode;
};

/**
 * Constants for the notification context
 */
const NOTIFICATION_CONSTANTS = {
    NOTIFICATION_DELETE_SLICE_BEGIN: 1,
    NOTIFICATION_TIMEOUT: 5000,
};

/**
 * @summary The Layout component, takes in no props and renders the overall layout of the application
 * @returns {JSX.Element} Layout component
 */
export const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [notifications, setNotifications] = React.useState<Notification[]>(
        [],
    );

    const notificationsMemo = React.useMemo(
        () => () => ({
            addNotification: (notification: Notification): void => {
                setNotifications((oldNotifications) => [
                    notification,
                    ...oldNotifications,
                ]);
                setTimeout(() => {
                    setNotifications((oldNotifications) =>
                        oldNotifications.slice(
                            NOTIFICATION_CONSTANTS.NOTIFICATION_DELETE_SLICE_BEGIN,
                        ),
                    );
                }, NOTIFICATION_CONSTANTS.NOTIFICATION_TIMEOUT);
            },
            notifications,
        }),
        [notifications],
    );

    return (
        <>
            <NotificationContext.Provider value={notificationsMemo()}>
                <Notifications />
                <div className={styles.main_page}>{children}</div>
            </NotificationContext.Provider>
            <Sidebar />
        </>
    );
};
