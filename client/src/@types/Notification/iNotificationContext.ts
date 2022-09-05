/* eslint-disable unicorn/prevent-abbreviations -- wrong abbreviation, i for interface not index */
import type { Notification } from "./Notification";

export type iNotificationContext = {
    addNotification: (_notification: Notification) => void;
    notifications: Notification[];
};
