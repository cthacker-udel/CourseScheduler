import React, { type ReactNode } from "react";

type PlaygroundProperties = {
    children: ReactNode;
};

/**
 *
 * @param properties - The properties of the playground page
 * @param properties.children - The react children wrapped in the playground
 * @returns
 */
export const Playground = ({ children }: PlaygroundProperties): JSX.Element => (
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
        {children}
    </div>
);
