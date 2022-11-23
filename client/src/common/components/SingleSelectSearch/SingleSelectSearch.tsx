/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
/* eslint-disable comma-spacing -- disabled */
/* eslint-disable @typescript-eslint/comma-dangle -- disabled */

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./SingleSelectSearch.module.css";

/**
 * The properties of the Single Select component
 */
type SingleSelectSearchProperties<T> = {
    caret?: boolean;
    customContainerClassName?: string;
    customContainerCaretClassName?: string;
    customContainerDropdownClassName?: string;
    customContainerDropdownItemClassName?: string;
    customContainerInputClassName?: string;
    customContainerInputOnClick?: (..._arguments: any) => any;
    customDisplayField?: string | ((_argument: T) => string);
    customSort?: (_item1: T, _item2: T) => number;
    items: T[];
};

/**
 * The functional signature of the Single Select functional component
 */
type SingleSelectSearchFunctionalSignature = <T>(
    _properties: SingleSelectSearchProperties<T>,
) => JSX.Element;

/**
 * Handles the single select dropdown container input click, adding the class name `visible` to the dropdown select
 */
const handleSingleSelectContainerInputClick = (
    event: MouseEvent,
): void => {
    const { target } = event;
    if (target !== undefined) {
        const htmlTarget = target as HTMLElement;
        const singleSelectContainer = htmlTarget.closest(
            "#single_select_container",
        );
        if (singleSelectContainer === null) {
            // If container is not hit, then toggle off single select dropdown **if** it has the visibility class name present
            const singleSelectDropdown = document.querySelector("#single_select_dropdown");
            if (singleSelectDropdown === null) {
                console.info("Unable to remove visibility from single select dropdown");
            } else if (singleSelectDropdown.className.includes(styles.single_select_dropdown_visible)) {
                const formattedClassName = `${singleSelectDropdown.className.replace(styles.single_select_dropdown_visible, "")} ${styles.single_select_dropdown_invisible}`;
                singleSelectDropdown.className = formattedClassName;
            }
        } else {
            // Hit container, if single select dropdown is not visible, toggle on, otherwise, do nothing
            const singleSelectDropdown = document.querySelector(
                "#single_select_dropdown",
            );
            if (
                singleSelectDropdown !== null &&
                !singleSelectDropdown.className.includes(
                    styles.single_select_dropdown_visible,
                )
            ) {
                // Is not visible, toggle on
                singleSelectDropdown.className = `${singleSelectDropdown.className.replace(styles.single_select_dropdown_invisible, "")} ${styles.single_select_dropdown_visible}`;
            }
        }
    }
};

/**
 * The abstract component to handle when the user desires a component for having input select functionality, while also having a search functionality as well.
 *
 * @param props - The properties of the single select search component
 * @param props.caret - Whether to display the caret in the select component or not
 * @param props.customContainerClassName - The custom class name to apply to the container, will override the default css applied
 * @param props.customContainerCaretClassName - The custom class name to apply to the container's caret style, will override the default css applied
 * @param props.customContainerDropdownClassName - The custom class name to apply to the container's dropdown style, will override the default css applied
 * @param props.customContainerDropdownItemClassName - The custom class name to apply to the container's dropdown item's style, will override the default css applied
 * @param props.customContainerInputClassName - The custom class name to apply to the container's input, will override the default css applied
 * @param props.customContainerInputOnClick - The custom onClick handler for the single select input
 * @param props.customDisplayField - Whether the items being passed in are custom, and the display is not as simple as just displaying the element
 * @param props.items - The items to display
 * @returns - The generic Single Select Search component
 */
export const SingleSelectSearch: SingleSelectSearchFunctionalSignature = <T,>({
    caret,
    customContainerClassName,
    customContainerCaretClassName,
    customContainerDropdownClassName,
    customContainerDropdownItemClassName,
    customContainerInputClassName,
    customContainerInputOnClick,
    customDisplayField,
    customSort,
    items,
}: SingleSelectSearchProperties<T>) => {
    React.useEffect(() => {
        // Append click listener for toggling on/off the visibility of the dropdown
        document.addEventListener("click", handleSingleSelectContainerInputClick);

        return () => {
            document.removeEventListener("click", handleSingleSelectContainerInputClick);
        };
    }, []);

    return (
        <div
            className={`${styles.single_select_container} ${
                customContainerClassName ?? ""
            }`}
            id="single_select_container"
        >
            <input
                className={`${styles.single_select_input} ${
                    customContainerInputClassName ?? ""
                }`}
                id="single_select_input"
                onClick={
                    customContainerInputOnClick ??
                    handleSingleSelectContainerInputClick
                }
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
                } ${customContainerDropdownClassName ?? ""} ${styles.single_select_dropdown_invisible}`}
                id="single_select_dropdown"
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
