import React from "react";

/**
 * Utility function for rendering the pre-requisites of a course
 *
 * @param preRequisites - The string of pre-requisites for the course
 * @returns The list of pre-requisites, bullets aligned left-most
 */
export const renderPreRequisites = (
    preRequisites: string,
): JSX.Element | undefined => {
    if (!preRequisites) {
        return undefined;
    }
    const classes = preRequisites.split(",");
    return (
        <ul className="d-flex flex-column">
            {classes.map((eachClass, _ind) => (
                <li
                    className="text-start"
                    // eslint-disable-next-line react/no-array-index-key -- not necessary
                    key={`${eachClass}-${_ind}`}
                >
                    {eachClass}
                </li>
            ))}
        </ul>
    );
};
