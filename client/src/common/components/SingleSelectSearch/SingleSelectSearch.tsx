import React from "react";

import styles from "./SingleSelectSearch.module.css";

type SingleSelectSearchProperties<T> = {
    caret?: boolean;
    customContainerClassName?: string;
    customContainerInputClassName?: string;
    customDisplayField?: string | ((_argument: T) => string);
    customSort?: (_item1: T, _item2: T) => number;
    items: T[];
};

type SingleSelectSearchFunctionalSignature = <T>(
    _properties: SingleSelectSearchProperties<T>,
) => JSX.Element;

/**
 *
 * @param props - The properties of the single select search component
 * @param props.caret - Whether to display the caret in the select component or not
 * @param props.customContainerClassName - The custom class name to apply to the container, will override the default css applied
 * @param props.customContainerInputClassName - The custom class name to apply to the container's input, will override the default css applied
 * @param props.customDisplayField - Whether the items being passed in are custom, and the display is not as simple as just displaying the element
 * @param props.items - The items to display
 * @returns
 */
export const SingleSelectSearch: SingleSelectSearchFunctionalSignature = <T,>({
    caret,
    customContainerClassName,
    customContainerInputClassName,
    customDisplayField,
    customSort,
    items,
}: SingleSelectSearchProperties<T>) => (
    <div
        className={`${styles.single_select_container} ${
            customContainerClassName ?? ""
        }`}
    >
        <input
            className={`${styles.single_select_input} ${
                customContainerInputClassName ?? ""
            }`}
            type="text"
        />
    </div>
);
