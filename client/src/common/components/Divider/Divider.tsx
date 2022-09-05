/* eslint-disable @typescript-eslint/strict-boolean-expressions -- disabled for this specific use case */
import React from "react";

type DividerProperties = {
    borderType?: string;
    opacity?: string;
    shadow?: string;
    width?: string;
    marginX?: string;
    marginY?: string;
};

/**
 * Divider component, used in many parts of the application to separate fields
 *
 * @param props The properties of the divider, style every part of the div
 * @returns The divider component, stylized by the user or defaults to the default style
 */
const Divider = ({
    borderType,
    opacity,
    shadow,
    width,
    marginX,
    marginY,
}: DividerProperties): JSX.Element => (
    <div
        className={`border ${borderType ?? "border-secondary"} ${
            opacity ?? "opacity-50"
        } ${shadow ?? "shadow-lg"} ${width ?? "w-50"} ${marginX ?? "mx-auto"} ${
            marginY ?? "my-3"
        }`}
    />
);

Divider.defaultProps = {
    borderType: undefined,
    marginX: undefined,
    marginY: undefined,
    opacity: undefined,
    shadow: undefined,
    width: undefined,
};

export { Divider };
