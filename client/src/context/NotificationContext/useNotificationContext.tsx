import React from "react";
import type { iNotificationContext } from "src/@types";

import { NotificationContext } from "./NotificationContext";

/**
 *
 */
export const useNotificationContext = (): iNotificationContext => {
    const notificationContextValue = React.useContext(NotificationContext);
    if (!notificationContextValue) {
        throw new Error("Invalid usage of notification context");
    }
    return notificationContextValue;
};
