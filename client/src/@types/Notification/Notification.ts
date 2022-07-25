import type { NotificationMessage } from "./NotificationMessage";

export type Notification = {
    variant?: string;
    delay?: number;
    message: NotificationMessage;
};
