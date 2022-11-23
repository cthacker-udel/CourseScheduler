/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
/* eslint-disable comma-spacing -- disabled */
/* eslint-disable @typescript-eslint/comma-dangle -- disabled */

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./SingleSelectSearch.module.css";

type SingleSelectSearchProperties<T> = {
    caret?: boolean;
    customContainerClassName?: string;
    customContainerCaretClassName?: string;
    customContainerDropdownClassName?: string;
    customContainerDropdownItemClassName?: string;
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
 * @param props.customContainerCaretClassName - The custom class name to apply to the container's caret style, will override the default css applied
 * @param props.customContainerDropdownClassName - The custom class name to apply to the container's dropdown style, will override the default css applied
 * @param props.customContainerDropdownItemClassName - The custom class name to apply to the container's dropdown item's style, will override the default css applied
 * @param props.customContainerInputClassName - The custom class name to apply to the container's input, will override the default css applied
 * @param props.customDisplayField - Whether the items being passed in are custom, and the display is not as simple as just displaying the element
 * @param props.items - The items to display
 * @returns
 */
export const SingleSelectSearch: SingleSelectSearchFunctionalSignature = <T,>({
    caret,
    customContainerClassName,
    customContainerCaretClassName,
    customContainerDropdownClassName,
    customContainerDropdownItemClassName,
    customContainerInputClassName,
    customDisplayField,
    customSort,
    items,
}: SingleSelectSearchProperties<T>) => {
    console.log("hello");
    return (
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
            {caret && (
                <FontAwesomeIcon
                    className={`position-absolute ${
                        styles.single_select_caret
                    } ${customContainerCaretClassName ?? ""}`}
                    icon={faCaretDown}
                />
            )}
            <div
                className={`position-absolute ${
                    styles.single_select_dropdown
                } ${customContainerDropdownClassName ?? ""}`}
            >
                {items.map((eachItem: T, _ind: number): JSX.Element => {
                    if (typeof customDisplayField === "string") {
                        return (
                            <div
                                className={`${
                                    styles.single_select_dropdown_item
                                } ${
                                    customContainerDropdownItemClassName ?? ""
                                }`}
                                key={`eachItem-${_ind}-${eachItem}`}
                            >
                                {
                                    (
                                        eachItem as unknown as {
                                            [key: string]: string;
                                        }
                                    )[customDisplayField]
                                }
                            </div>
                        );
                    } else if (typeof customDisplayField === "function") {
                        return (
                            <div
                                className={`${
                                    styles.single_select_dropdown_item
                                } ${
                                    customContainerDropdownItemClassName ?? ""
                                }`}
                                key={`eachItem-${_ind}-${eachItem}`}
                            >
                                {customDisplayField(eachItem)}
                            </div>
                        );
                    }
                    return (
                        <div
                            className={`${styles.single_select_dropdown_item} ${
                                customContainerDropdownItemClassName ?? ""
                            }`}
                            key={`eachItem-${_ind}-${eachItem}`}
                        >
                            {eachItem as unknown as string}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
