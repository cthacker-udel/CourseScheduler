/* eslint-disable @typescript-eslint/indent  -- disabled */
/* eslint-disable no-magic-numbers -- disabled */
/* eslint-disable arrow-body-style -- disabled */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- disabled */
/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
/* eslint-disable comma-spacing -- disabled */
/* eslint-disable @typescript-eslint/comma-dangle -- disabled */

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { findMatches } from "src/helpers";

import styles from "./SingleSelectSearch.module.css";

/**
 * The properties of the Single Select component
 */
type SingleSelectSearchProperties<T> = {
    caret?: boolean;
    customContainerClassName?: string;
    customContainerOnClick?: (..._arguments: any) => any;
    customContainerCaretClassName?: string;
    customContainerDropdownClassName?: string;
    customContainerDropdownItemClassName?: string;
    customContainerDropdownItemIdGenerator?: (_item: T) => string;
    customContainerInputClassName?: string;
    customContainerInputOnChange?: (..._arguments: any) => any;
    customContainerInputOnChangeCustomComparator?: (
        _item1: T,
        _matchingValue: any,
    ) => boolean;
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
const handleSingleSelectContainerClick = (event: MouseEvent): void => {
    const { target } = event;
    if (target !== undefined) {
        const htmlTarget = target as HTMLElement;
        const singleSelectContainer = htmlTarget.closest(
            "#single_select_container",
        );
        if (singleSelectContainer === null) {
            // If container is not hit, then toggle off single select dropdown **if** it has the visibility class name present
            const singleSelectDropdown = document.querySelector(
                "#single_select_dropdown",
            );
            if (singleSelectDropdown === null) {
                console.info(
                    "Unable to remove visibility from single select dropdown",
                );
            } else if (
                singleSelectDropdown.className.includes(
                    styles.single_select_dropdown_visible,
                )
            ) {
                const formattedClassName = `${singleSelectDropdown.className.replace(
                    styles.single_select_dropdown_visible,
                    "",
                )} ${styles.single_select_dropdown_invisible}`;
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
                singleSelectDropdown.className = `${singleSelectDropdown.className.replace(
                    styles.single_select_dropdown_invisible,
                    "",
                )} ${styles.single_select_dropdown_visible}`;
            }
        }
    }
};

/**
 * Handles the user input and searches for matches, finds them, and then scrolls to them
 *
 * @param items - The items we are using the match finding with
 * @param changeEvent - The event that is fired off as the user is typing
 * @param customComparator - The custom comparator, if supplied, allows for comparison of complex types
 */
const handleSingleSelectInputOnChange = <T,>(
    items: any,
    changeEvent: React.ChangeEvent<HTMLInputElement>,
    customComparator?: (_item1: T, _matchingValue: any) => boolean,
    customIdGenerator?: (_item1: T) => string,
): void => {
    const { target } = changeEvent;
    if (target !== undefined) {
        const { value } = target;
        const matches = findMatches<T>(
            items,
            value,
            customComparator ?? undefined,
        );
        // Find first match, and scroll to it
        if (matches.length > 0) {
            // Gather first match
            const firstMatchId = customIdGenerator
                ? customIdGenerator(matches[0])
                : matches[0];
            if (firstMatchId === undefined) {
                console.info(`Could not access first match ${matches[0]} id`);
            } else {
                const foundElement = document.querySelector(`#${firstMatchId}`);
                foundElement?.scrollIntoView({ behavior: "smooth" });
                foundElement?.animate(
                    [
                        {
                            backgroundColor: "lightgray",
                        },
                        {
                            backgroundColor: "lightblue",
                        },
                    ],
                    { duration: 1200, easing: "ease-in-out", fill: "forwards" },
                );
                foundElement?.animate(
                    [
                        {
                            backgroundColor: "lightblue",
                        },
                        {
                            backgroundColor: "lightgray",
                        },
                    ],
                    { duration: 800, easing: "ease-in-out", fill: "forwards" },
                );
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
 * @param props.customContainerDropdownItemIdGenerator - The custom id generator for allowing the scroll functionality to happen once matches have been generated by the user input
 * @param props.customContainerInputClassName - The custom class name to apply to the container's input, will override the default css applied
 * @param props.customContainerInputOnClick - The custom onClick handler for the single select input
 * @param props.customContainerInputOnChange - The custom onChange handler for the single select input
 * @param props.customContainerInputOnChangeCustomComparator - The custom comparator to be used when filtering values within the single select search
 * @param props.customDisplayField - Whether the items being passed in are custom, and the display is not as simple as just displaying the element
 * @param props.items - The items to display
 * @returns - The generic Single Select Search component
 */
export const SingleSelectSearch: SingleSelectSearchFunctionalSignature = <T,>({
    caret,
    customContainerClassName,
    customContainerOnClick,
    customContainerCaretClassName,
    customContainerDropdownClassName,
    customContainerDropdownItemClassName,
    customContainerInputClassName,
    customContainerInputOnChange,
    customContainerInputOnChangeCustomComparator,
    customContainerDropdownItemIdGenerator,
    customContainerInputOnClick,
    customDisplayField,
    customSort,
    items,
}: SingleSelectSearchProperties<T>) => {
    /**
     * The useEffect hook for appending the onClick listener that
     * makes the dropdown options appear and disappear as the user clicks on/off the input
     */
    React.useEffect(() => {
        // Append click listener for toggling on/off the visibility of the dropdown
        document.addEventListener(
            "click",
            customContainerOnClick ?? handleSingleSelectContainerClick,
        );

        return () => {
            document.removeEventListener(
                "click",
                customContainerOnClick ?? handleSingleSelectContainerClick,
            );
        };
    }, [customContainerOnClick]);

    /**
     * The onChange callback that is fired as the user enters input into the single select input,
     * can be overridden with custom prop
     */
    const singleSelectInputOnChangeCallback = React.useCallback(
        (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
            return handleSingleSelectInputOnChange<T>(
                items,
                changeEvent,
                customContainerInputOnChangeCustomComparator ?? undefined,
                customContainerDropdownItemIdGenerator ?? undefined,
            );
        },
        [
            customContainerInputOnChangeCustomComparator,
            customContainerDropdownItemIdGenerator,
            items,
        ],
    );

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
                onChange={
                    customContainerInputOnChange ??
                    singleSelectInputOnChangeCallback
                }
                onClick={customContainerInputOnClick ?? undefined}
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
                } ${customContainerDropdownClassName ?? ""} ${
                    styles.single_select_dropdown_invisible
                }`}
                id="single_select_dropdown"
            >
                {(customSort ? items.sort(customSort) : items).map(
                    (eachItem: T, _ind: number): JSX.Element => {
                        if (typeof customDisplayField === "string") {
                            return (
                                <div
                                    className={`${
                                        styles.single_select_dropdown_item
                                    } ${
                                        customContainerDropdownItemClassName ??
                                        ""
                                    }`}
                                    id={
                                        customContainerDropdownItemIdGenerator
                                            ? customContainerDropdownItemIdGenerator(
                                                  eachItem,
                                              )
                                            : typeof eachItem === "string"
                                            ? eachItem
                                            : JSON.stringify(eachItem)
                                    }
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
                                        customContainerDropdownItemClassName ??
                                        ""
                                    }`}
                                    id={
                                        customContainerDropdownItemIdGenerator
                                            ? customContainerDropdownItemIdGenerator(
                                                  eachItem,
                                              )
                                            : typeof eachItem === "string"
                                            ? eachItem
                                            : JSON.stringify(eachItem)
                                    }
                                    key={`eachItem-${_ind}-${eachItem}`}
                                >
                                    {customDisplayField(eachItem)}
                                </div>
                            );
                        }
                        return (
                            <div
                                className={`${
                                    styles.single_select_dropdown_item
                                } ${
                                    customContainerDropdownItemClassName ?? ""
                                }`}
                                id={
                                    customContainerDropdownItemIdGenerator
                                        ? customContainerDropdownItemIdGenerator(
                                              eachItem,
                                          )
                                        : typeof eachItem === "string"
                                        ? eachItem
                                        : JSON.stringify(eachItem)
                                }
                                key={`eachItem-${_ind}-${eachItem}`}
                            >
                                {eachItem as unknown as string}
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
};
