import type { Notification } from "./Notification";

export type iNotificationContext = {
    addNotification: (_notification: Notification) => void;
    notifications: Notification[];
};
