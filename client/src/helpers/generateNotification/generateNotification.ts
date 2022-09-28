import type { Notification } from "src/@types";

/**
 * Generates a notification
 *
 * @param body - body of the notification
 * @param header - title of the notification
 * @param delay - delay of the notification
 * @param variant - the variant of the notification
 * @returns The generated notification
 */
export const generateNotification = (
    body: string,
    header?: string,
    delay?: number,
    variant?: string,
): Notification =>
    ({
        delay,
        message: { body, header },
        variant,
    } as Notification);
