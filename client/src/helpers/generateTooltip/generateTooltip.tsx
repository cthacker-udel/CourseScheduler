import React from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import styles from "./generateTooltip.module.css";

/**
 * This generates the OverlayTrigger's tooltip
 * @param fmtMessageId The ID of the formatted message
 * @param props The PopperJS props passed into the tooltip via the OverlayTrigger component
 * @param values The values of the formattedMessage that display the message
 * @returns {JSX.Element} The tooltip with given props, values, and id
 */
export const generateTooltip = (
    message: string,
    properties: OverlayInjectedProps,
): JSX.Element => (
    <Tooltip
        {...properties}
        className={styles.custom_tooltip_override}
        id={`tooltip-${message}`}
    >
        {message}
    </Tooltip>
);
