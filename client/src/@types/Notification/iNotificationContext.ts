import type { Notification } from "./Notification";

export type iNotificationContext = {
    addNotification: (_notification: Notification) => void;
    deleteNotification: (_index: number) => void;
    notifications: Notification[];
};
