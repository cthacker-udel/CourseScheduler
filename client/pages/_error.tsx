import React from "react";

type ErrorProperties = {
    statusCode: number;
};

/**
 * Default error page
 *
 * @param props The status code
 * @returns The default error page
 */
const Error = ({ statusCode }: ErrorProperties): JSX.Element => (
    <p>
        {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
    </p>
);

export default Error;
