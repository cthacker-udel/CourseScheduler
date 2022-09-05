import React from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { FormattedMessage } from "react-intl";

import styles from "./generateTooltipIntl.module.css";

/**
 * This generates the OverlayTrigger's tooltip
 * @param fmtMessageId The ID of the formatted message
 * @param props The PopperJS props passed into the tooltip via the OverlayTrigger component
 * @param values The values of the formattedMessage that display the message
 * @returns {JSX.Element} The tooltip with given props, values, and id
 */
export const generateTooltipIntl = (
    fmtMessageId: string,
    properties: OverlayInjectedProps,
    values: { [key: string]: string },
): JSX.Element => (
    <Tooltip
        {...properties}
        className={styles.custom_tooltip_override}
        id={`${fmtMessageId}-${JSON.stringify(values)}`}
    >
        <FormattedMessage id={fmtMessageId} values={values} />
    </Tooltip>
);
