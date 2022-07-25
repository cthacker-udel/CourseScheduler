/* eslint-disable @typescript-eslint/indent -- bug with prettier */
import React from "react";
import type { iNotificationContext } from "src/@types";

export const NotificationContext = React.createContext<
    iNotificationContext | undefined
>(undefined);
