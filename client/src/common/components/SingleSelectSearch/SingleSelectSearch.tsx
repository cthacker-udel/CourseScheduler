/* eslint-disable max-statements -- disabled */
/* eslint-disable sonarjs/no-duplicate-string -- disabled, only used 3 times */
/* eslint-disable no-console -- disabled */
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
    customContainerOnEnter?: (..._arguments: any) => any;
    customContainerOnArrowDown?: (..._arguments: any) => any;
    customContainerOnArrowUp?: (..._arguments: any) => any;
    customContainerCaretClassName?: string;
    customContainerDropdownClassName?: string;
    customContainerDropdownItemClassName?: string;
    customContainerDropdownItemIdGenerator?: (_item: T) => string;
    customContainerDropdownItemOnClick?: (..._arguments: any) => any;
    customContainerInputClassName?: string;
    customContainerInputOnChange?: (..._arguments: any) => any;
    customContainerInputOnChangeCustomComparator?: (
        _item1: T,
        _matchingValue: any,
    ) => boolean;
    customContainerInputOnClick?: (..._arguments: any) => any;
    customContainerInputOnSelect?: (..._arguments: any) => any;
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
 * Clears the selected input, removing it's selected css effect
 * @returns - the child index
 */
const clearSelectedDropdownElement = (): void => {
    const selectedElement = document.querySelector(
        `.${styles.single_select_selected_dropdown_element}`,
    );
    if (selectedElement !== null) {
        selectedElement.className = selectedElement.className.replace(
            styles.single_select_selected_dropdown_element,
            "",
        );
    }
};

/**
 * Finds the selected element within the dropdown
 *
 * @returns The element if found, undefined if not
 */
const getSelectedDropdownElement = (): HTMLElement | undefined => {
    const selectedElement = document.querySelector(
        `.${styles.single_select_selected_dropdown_element}`,
    );
    return (selectedElement as HTMLElement) ?? undefined;
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
                const selectedElement = getSelectedDropdownElement();
                console.log(selectedElement);
                if (
                    selectedElement?.id !==
                    (customIdGenerator
                        ? customIdGenerator(matches[0])
                        : matches[0])
                ) {
                    console.log("clearing");
                    clearSelectedDropdownElement();
                }
                const foundElement = document.querySelector(`#${firstMatchId}`);
                if (foundElement !== null) {
                    foundElement.scrollIntoView({ behavior: "smooth" });
                    foundElement.className = `${foundElement.className} ${styles.single_select_selected_dropdown_element}`;
                }
            }
        }
    }
};

/**
 * Handles the onClick event of a dropdown item
 *
 * @param items - The items to pass to the onSelect handler
 * @param index - The index of the item
 * @param customInputOnSelectHandler - The custom input on select handler that handles when a dropdown item is selected via onClick or enter key
 */
const handleDropdownItemOnClick = <T,>(
    clickEvent: React.MouseEvent<HTMLDivElement>,
    items: T[],
    index: number,
    customDisplayField?: string | ((_argument: T) => string),
    customInputOnSelectHandler?: (..._arguments: any) => any,
): void => {
    if (customInputOnSelectHandler !== undefined) {
        clearSelectedDropdownElement();
        const singleSelectDropdown = document.querySelector(
            "#single_select_dropdown",
        );
        if (singleSelectDropdown !== null) {
            singleSelectDropdown.className = `${singleSelectDropdown.className.replace(
                styles.single_select_dropdown_visible,
                "",
            )} ${styles.single_select_dropdown_invisible}`;
            const singleSelectInput = document.querySelector(
                "#single_select_input",
            );
            if (singleSelectInput !== null) {
                const singleSelectAsHtmlElement =
                    singleSelectInput as HTMLInputElement;
                if (singleSelectAsHtmlElement !== undefined) {
                    singleSelectAsHtmlElement.value =
                        customDisplayField === undefined
                            ? (items[index] as string)
                            : typeof customDisplayField === "string"
                            ? (items[index] as { [key: string]: string })[
                                  customDisplayField
                              ]
                            : customDisplayField(items[index]);
                    singleSelectAsHtmlElement.blur();
                }
            }
            customInputOnSelectHandler(items[index]);
        }
    }
    clickEvent.stopPropagation();
};

/**
 * ### Handles all key presses and has the select handler to call it *if necessary* according to the keypress
 *
 * @param items - The items to send via the onSelect handler, which will be accessed through the index (`colind`) with each dropdown element
 * @param keyPressEvent - The keypress event itself
 * @param customDisplayField - The custom display field function, used to set the input's value field
 * @param customEnterHandler - The custom enter handler
 * @param customArrowDownHandler - The custom keydown handler
 * @param customArrowUpHandler - The custom keyup handler
 * @param customInputOnSelectHandler - The custom onSelect handler, used when the user selects an element (ties into the enter handler)
 */
const handleSingleSelectKeyPress = <T,>(
    keyPressEvent: KeyboardEvent,
    items: T[],
    customDisplayField?: string | ((_argument: T) => string),
    customEnterHandler?: (..._arguments: any) => any,
    customArrowDownHandler?: (..._arguments: any) => any,
    customArrowUpHandler?: (..._arguments: any) => any,
    customInputOnSelectHandler?: (..._arguments: any) => any,
): void => {
    const isDropdownVisible =
        document.querySelector(`.${styles.single_select_dropdown_visible}`) !==
        null;
    if (isDropdownVisible) {
        const { code } = keyPressEvent;
        switch (code) {
            case "ArrowUp": {
                if (customArrowUpHandler) {
                    customArrowUpHandler(
                        keyPressEvent,
                        customInputOnSelectHandler,
                    );
                } else {
                    const selectedElement = getSelectedDropdownElement();
                    clearSelectedDropdownElement();
                    if (selectedElement === undefined) {
                        // No selected element, must be stale list
                        const singleSelectDropdown = document.querySelector(
                            "#single_select_dropdown",
                        );
                        if (singleSelectDropdown !== null) {
                            const singleSelectDropdownChildren =
                                singleSelectDropdown.children;
                            if (singleSelectDropdownChildren.length > 0) {
                                singleSelectDropdownChildren[0].className = `${singleSelectDropdownChildren[0].className} ${styles.single_select_selected_dropdown_element}`;
                            }
                        }
                    } else {
                        const selectedElementIndex =
                            selectedElement.dataset.colind;
                        if (selectedElementIndex !== null) {
                            const singleSelectDropdown = document.querySelector(
                                "#single_select_dropdown",
                            );
                            if (singleSelectDropdown !== null) {
                                const newSelectedElement =
                                    singleSelectDropdown.children[
                                        Number(selectedElementIndex) - 1
                                    ];
                                if (newSelectedElement !== undefined) {
                                    newSelectedElement.className = `${newSelectedElement.className} ${styles.single_select_selected_dropdown_element}`;
                                    newSelectedElement.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }
                        }
                    }
                }
                break;
            }
            case "ArrowDown": {
                if (customArrowDownHandler) {
                    customArrowDownHandler(
                        keyPressEvent,
                        customInputOnSelectHandler,
                    );
                } else {
                    const selectedElement = getSelectedDropdownElement();
                    clearSelectedDropdownElement();
                    if (selectedElement === undefined) {
                        // No selected element, must be stale list
                        const singleSelectDropdown = document.querySelector(
                            "#single_select_dropdown",
                        );
                        if (singleSelectDropdown !== null) {
                            const singleSelectDropdownChildren =
                                singleSelectDropdown.children;
                            if (singleSelectDropdownChildren.length > 0) {
                                singleSelectDropdownChildren[0].className = `${singleSelectDropdownChildren[0].className} ${styles.single_select_selected_dropdown_element}`;
                                singleSelectDropdownChildren[0].scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                        }
                    } else {
                        const selectedElementIndex =
                            selectedElement.dataset.colind;
                        if (selectedElementIndex !== null) {
                            const singleSelectDropdown = document.querySelector(
                                "#single_select_dropdown",
                            );
                            if (singleSelectDropdown !== null) {
                                const newSelectedElement =
                                    singleSelectDropdown.children[
                                        Number(selectedElementIndex) + 1
                                    ];
                                if (newSelectedElement !== undefined) {
                                    newSelectedElement.className = `${newSelectedElement.className} ${styles.single_select_selected_dropdown_element}`;
                                    newSelectedElement.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }
                        }
                    }
                }
                break;
            }
            case "Enter": {
                if (customEnterHandler) {
                    customEnterHandler(
                        keyPressEvent,
                        customInputOnSelectHandler,
                    );
                } else if (customInputOnSelectHandler !== undefined) {
                    const selectedElement = getSelectedDropdownElement();
                    if (selectedElement !== undefined) {
                        const selectedElementIndex =
                            selectedElement.dataset.colind;
                        if (selectedElementIndex !== undefined) {
                            const selectedItem =
                                items[Number(selectedElementIndex)];
                            customInputOnSelectHandler(selectedItem);
                            const singleSelectDropdown = document.querySelector(
                                "#single_select_dropdown",
                            );
                            if (singleSelectDropdown !== null) {
                                singleSelectDropdown.className = `${singleSelectDropdown.className.replace(
                                    styles.single_select_dropdown_visible,
                                    "",
                                )} ${styles.single_select_dropdown_invisible}`;
                            }
                            const singleSelectInput = document.querySelector(
                                "#single_select_input",
                            );
                            if (singleSelectInput !== null) {
                                const singleSelectInputAsHtmlInput =
                                    singleSelectInput as HTMLInputElement;
                                singleSelectInputAsHtmlInput.value =
                                    customDisplayField === undefined
                                        ? (selectedItem as string)
                                        : typeof customDisplayField === "string"
                                        ? (
                                              selectedItem as {
                                                  [key: string]: string;
                                              }
                                          )[customDisplayField]
                                        : customDisplayField(selectedItem);
                                singleSelectInputAsHtmlInput.blur();
                            }
                        }
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
    }
    keyPressEvent.stopImmediatePropagation();
};

/**
 * The abstract component to handle when the user desires a component for having input select functionality, while also having a search functionality as well.
 *
 * @param props - The properties of the single select search component
 * @param props.caret - Whether to display the caret in the select component or not
 * @param props.customContainerClassName - The custom class name to apply to the container, will override the default css applied
 * @param props.customContainerOnClick - The custom onClick method that fires once the container itself is clicked on
 * @param props.customContainerOnEnter - The custom method that fires once the enter key is pressed
 * @param props.customContainerOnArrowDown - The custom method that fires once the arrow down key is pressed
 * @param props.customContainerOnArrowUp - The custom method that fires once the arrow up key is pressed
 * @param props.customContainerCaretClassName - The custom class name to apply to the container's caret style, will override the default css applied
 * @param props.customContainerDropdownClassName - The custom class name to apply to the container's dropdown style, will override the default css applied
 * @param props.customContainerDropdownItemClassName - The custom class name to apply to the container's dropdown item's style, will override the default css applied
 * @param props.customContainerDropdownItemIdGenerator - The custom id generator for allowing the scroll functionality to happen once matches have been generated by the user input
 * @param props.customContainerDropdownItemOnClick - The custom onClick handler when the user clicks on a dropdown item
 * @param props.customContainerInputClassName - The custom class name to apply to the container's input, will override the default css applied
 * @param props.customContainerInputOnClick - The custom onClick handler for the single select input
 * @param props.customContainerInputOnChange - The custom onChange handler for the single select input
 * @param props.customContainerInputOnChangeCustomComparator - The custom comparator to be used when filtering values within the single select search
 * @param props.customContainerInputOnSelect - The custom handler method that fires when an item is selected within the input (dropdown)
 * @param props.customDisplayField - Whether the items being passed in are custom, and the display is not as simple as just displaying the element
 * @param props.items - The items to display
 * @returns - The generic Single Select Search component
 */
export const SingleSelectSearch: SingleSelectSearchFunctionalSignature = <T,>({
    caret,
    customContainerClassName,
    customContainerOnClick,
    customContainerOnEnter,
    customContainerOnArrowDown,
    customContainerOnArrowUp,
    customContainerCaretClassName,
    customContainerDropdownClassName,
    customContainerDropdownItemClassName,
    customContainerDropdownItemIdGenerator,
    customContainerDropdownItemOnClick,
    customContainerInputClassName,
    customContainerInputOnClick,
    customContainerInputOnChange,
    customContainerInputOnChangeCustomComparator,
    customContainerInputOnSelect,
    customDisplayField,
    customSort,
    items,
}: SingleSelectSearchProperties<T>) => {
    /**
     * Handler for propagating all the custom arguments into the keypress function, rather then
     * have to do it manually within the useEffect. Allows also for the event to be removed due to the function being an object
     * rather then an anonymous function
     */
    const handleSingleSelectKeyPressArgumentPropagation = React.useCallback(
        (event: KeyboardEvent) =>
            handleSingleSelectKeyPress<T>(
                event,
                items,
                customDisplayField,
                customContainerOnEnter ?? undefined,
                customContainerOnArrowDown ?? undefined,
                customContainerOnArrowUp ?? undefined,
                customContainerInputOnSelect ?? undefined,
            ),
        [
            customContainerOnEnter,
            customContainerOnArrowDown,
            customContainerOnArrowUp,
            customContainerInputOnSelect,
            customDisplayField,
            items,
        ],
    );

    const handleDropdownItemOnClickCallback = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>, _index: number) => {
            handleDropdownItemOnClick(
                event,
                items,
                _index,
                customDisplayField,
                customContainerInputOnSelect,
            );
        },
        [customContainerInputOnSelect, customDisplayField, items],
    );

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

        document.addEventListener(
            "keydown",
            handleSingleSelectKeyPressArgumentPropagation,
        );

        return () => {
            document.removeEventListener(
                "click",
                customContainerOnClick ?? handleSingleSelectContainerClick,
            );
            document.removeEventListener(
                "keypress",
                handleSingleSelectKeyPressArgumentPropagation,
            );
        };
    }, [customContainerOnClick, handleSingleSelectKeyPressArgumentPropagation]);

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
                                    data-colind={_ind}
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
                                    onClick={(
                                        event: React.MouseEvent<HTMLDivElement>,
                                    ): void =>
                                        customContainerDropdownItemOnClick?.(
                                            event,
                                        ) ??
                                        handleDropdownItemOnClickCallback(
                                            event,
                                            _ind,
                                        )
                                    }
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
                                    data-colind={_ind}
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
                                    onClick={(
                                        event: React.MouseEvent<HTMLDivElement>,
                                    ): void =>
                                        customContainerDropdownItemOnClick?.(
                                            event,
                                        ) ??
                                        handleDropdownItemOnClickCallback(
                                            event,
                                            _ind,
                                        )
                                    }
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
                                data-colind={_ind}
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
                                onClick={(
                                    event: React.MouseEvent<HTMLDivElement>,
                                ): void =>
                                    customContainerDropdownItemOnClick?.(
                                        event,
                                    ) ??
                                    handleDropdownItemOnClickCallback(
                                        event,
                                        _ind,
                                    )
                                }
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
