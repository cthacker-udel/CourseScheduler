import React from "react";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import type { Notification } from "src/@types";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";

import styles from "./Notifications.module.css";

const DEFAULT_NOTIFICATION_DELAY = 5000;

/**
 * The notification service
 *
 * @returns
 */
export const Notifications = (): JSX.Element => {
    const { notifications } = useNotificationContext();
    return (
        <ToastContainer className={styles.toast_override} position="top-end">
            {notifications.map((eachNotification: Notification) => (
                <Toast
                    animation
                    autohide
                    bg={eachNotification.variant ?? "primary"}
                    delay={eachNotification.delay ?? DEFAULT_NOTIFICATION_DELAY}
                    key={`toast-${eachNotification.message.body}`}
                    show
                >
                    {eachNotification.message.header && (
                        <ToastHeader className="text-wrap text-center">
                            {eachNotification.message.header}
                        </ToastHeader>
                    )}
                    <ToastBody className="text-wrap text-center">
                        {eachNotification.message.body}
                    </ToastBody>
                </Toast>
            ))}
        </ToastContainer>
    );
};
