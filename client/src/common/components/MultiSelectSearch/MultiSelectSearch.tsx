/* eslint-disable @typescript-eslint/indent -- prettier/eslint conflict */
/* eslint-disable no-magic-numbers -- unnecessary for custom component */
/* eslint-disable @typescript-eslint/no-explicit-any -- generic component takes any as items */
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ListGroup } from "react-bootstrap";

import styles from "./MultiSelectSearch.module.css";

const CONSTANTS = {
    LISTGROUP_DARK_ITEM: "list-group-item-dark",
};

type MultiSelectSearchProperties = {
    caret?: boolean;
    customSort?: (_a: unknown, _b: unknown) => number;
    displayItemField?: string | ((_argument: any) => string);
    items: any[];
    parentClassName?: string;
    pushSelectedItems?: (_items: any) => void;
};

/**
 * Common MultiSelectSearch component, allows for any items to be passed in, and custom sorting algorithm as well on the items
 *
 * @param props - The properties of the MultiSelectSearch
 * @param props.caret - Whether to display the caret or not, defaults to true
 * @param props.customSort - The custom sorting algorithm for the items in the MultiSelectSearch
 * @param props.displayItemField - The field to display to the user, for each object a field is used to represent what to display to the user, if it's not an object, then the item itself is displayed
 * @param props.items - The items the MultiSelectSearch component will be displaying
 * @param props.parentClassName - The className of the parent div component
 * @param props.pushSelectedItems - An propagation function that sends the pushed items to the consumer
 * @returns The reusable MultiSelectSearch component
 */
export const MultiSelectSearch = ({
    caret = true,
    customSort,
    displayItemField,
    items,
    parentClassName,
    pushSelectedItems,
}: MultiSelectSearchProperties): JSX.Element => {
    const sortedItems = React.useMemo(
        () => (customSort ? items.sort(customSort) : items),
        [customSort, items],
    );
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<number | undefined>(
        0,
    );
    const [displaySelect, setDisplaySelect] = React.useState<boolean>(false);
    const dropdownReference = React.createRef<HTMLDivElement>();
    const dropdownContainerReference = React.createRef<HTMLDivElement>();
    const inputReference = React.createRef<HTMLInputElement>();
    const searchCache: { [key: string]: number } = React.useMemo(
        () => ({}),
        [],
    );

    /**
     * Callback that fires when the `focusin` event fires, effectively checking if we focused into the multiselect div
     * and if so, then we apply focus to the input which the user types in
     */
    const focusInCallback = React.useCallback(
        (event: FocusEvent) => {
            if (event.target) {
                const { target } = event;
                if (
                    (target as HTMLDivElement)?.id ===
                        "multiselect-search-component" &&
                    inputReference.current !== null
                ) {
                    inputReference.current.focus();
                }
            }
        },
        [inputReference],
    );

    /**
     * Callback that fires when the `focusout` event fires, effectively checking if we focused out of the multiselect search
     * input, and if so, we execute a blur event on the input and clear the inputted value
     */
    const focusOutCallback = React.useCallback(
        (event: FocusEvent) => {
            if (event.target) {
                const { target } = event;
                if (
                    (target as HTMLInputElement)?.id ===
                        "multiselect-search-input" &&
                    inputReference.current !== null
                ) {
                    inputReference.current.value = "";
                    inputReference.current.blur();
                }
            }
        },
        [inputReference],
    );

    /**
     * Takes in an input, and decides which index we need to scroll to in the array to
     * reach that course, used in accordance with selected item as well, which automatically
     * scrolls the list down to the item
     */
    const findIndexToScrollTo = React.useCallback(
        (inputtedValue: string) => {
            if (searchCache[inputtedValue]) {
                return searchCache[inputtedValue];
            }
            const findFirstIndex = items.findIndex((eachItem) => {
                const result =
                    displayItemField === undefined
                        ? eachItem === inputtedValue
                        : typeof displayItemField === "string"
                        ? eachItem[displayItemField] === inputtedValue ||
                          eachItem[displayItemField]
                              .toLowerCase()
                              .includes(inputtedValue.toLowerCase())
                        : displayItemField(eachItem)
                              .toLowerCase()
                              .includes(inputtedValue.toLowerCase());
                return result;
            });
            searchCache[inputtedValue] = findFirstIndex;
            return findFirstIndex;
        },
        [displayItemField, items, searchCache],
    );

    React.useEffect(() => {
        window.addEventListener("focusin", focusInCallback);
        window.addEventListener("focusout", focusOutCallback);
        return (): void => {
            window.removeEventListener("focusin", focusInCallback);
            window.removeEventListener("focusout", focusOutCallback);
        };
    }, [focusInCallback, focusOutCallback]);

    React.useEffect(() => {
        if (pushSelectedItems) {
            pushSelectedItems(selectedItems);
        }
    }, [pushSelectedItems, selectedItems]);

    const markItem = React.useCallback((index: number) => {
        const selectedItemToMark = document.querySelector(`#item-${index}`);
        if (selectedItemToMark) {
            const selectedDivElement = selectedItemToMark as HTMLDivElement;
            if (
                !selectedDivElement.className.includes(
                    ` ${styles.select_list_selected_item}`,
                )
            ) {
                setSelectedItems((oldSelectedItems: number[]) => [
                    ...oldSelectedItems,
                    index,
                ]);
            } else if (
                selectedDivElement.className.includes(
                    ` ${styles.select_list_selected_item}`,
                )
            ) {
                setSelectedItems((oldSelectedItems: number[]) =>
                    oldSelectedItems.filter((element) => element !== index),
                );
                selectedDivElement.className = `${selectedDivElement.className.replace(
                    ` ${styles.select_list_selected_item}`,
                    "",
                )} ${CONSTANTS.LISTGROUP_DARK_ITEM}`;
            }
        }
    }, []);

    React.useEffect(() => {
        if (
            displaySelect &&
            selectedItem !== undefined &&
            selectedItem >= 0 &&
            selectedItem < sortedItems.length
        ) {
            const itemOption = document.querySelector(`#item-${selectedItem}`);
            const itemOptionAbove = document.querySelector(
                `#item-${selectedItem - 1}`,
            );
            const itemOptionBelow = document.querySelector(
                `#item-${selectedItem + 1}`,
            );
            if (itemOptionAbove) {
                itemOptionAbove.className = itemOptionAbove.className.replace(
                    CONSTANTS.LISTGROUP_DARK_ITEM,
                    "",
                );
            }
            if (itemOptionBelow) {
                itemOptionBelow.className = itemOptionBelow.className.replace(
                    CONSTANTS.LISTGROUP_DARK_ITEM,
                    "",
                );
            }
            if (itemOption) {
                const itemDivElement: HTMLDivElement =
                    itemOption as HTMLDivElement;
                itemDivElement.className = `${itemDivElement.className} ${CONSTANTS.LISTGROUP_DARK_ITEM}`;
                itemDivElement?.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [displaySelect, selectedItem, sortedItems.length]);

    return (
        <div>
            <div
                className={`${parentClassName} d-flex flex-row justify-content-end p-2 border border-2 rounded position-relative ${styles.select_container}`}
                id="multiselect-search-component"
                onBlur={(): void => {
                    setDisplaySelect(false);
                    setSelectedItem(0);
                }}
                onFocus={(): void => {
                    setDisplaySelect(true);
                    setSelectedItem(0);
                }}
                onKeyDown={(
                    event_: React.KeyboardEvent<HTMLDivElement>,
                ): void => {
                    const { key } = event_;
                    switch (key) {
                        case "ArrowUp": {
                            if (
                                selectedItem !== undefined &&
                                selectedItem > 0
                            ) {
                                setSelectedItem(selectedItem - 1);
                            }
                            break;
                        }
                        case "ArrowDown": {
                            if (
                                selectedItem !== undefined &&
                                selectedItem < sortedItems.length - 1
                            ) {
                                setSelectedItem(selectedItem + 1);
                            }
                            break;
                        }
                        case "Enter": {
                            if (selectedItem !== undefined) {
                                markItem(selectedItem);
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }}
                onMouseDown={(): void => {
                    setDisplaySelect(!displaySelect);
                }}
                ref={dropdownContainerReference}
                role="button"
                tabIndex={1}
            >
                <input
                    autoComplete="off"
                    className={`border-0 w-100 me-4 pe-none ${styles.select_text_input}`}
                    id="multiselect-search-input"
                    onChange={(
                        changeEvent: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        if (changeEvent.target !== undefined) {
                            const { target } = changeEvent;
                            if (inputReference.current) {
                                inputReference.current.value = target.value;
                                const foundIndex = findIndexToScrollTo(
                                    target.value,
                                );
                                if (foundIndex >= 0) {
                                    setSelectedItem(foundIndex);
                                } else {
                                    setSelectedItem(0);
                                }
                            }
                        }
                    }}
                    ref={inputReference}
                    type="text"
                />
                {caret && (
                    <FontAwesomeIcon
                        className="pe-2 my-auto"
                        icon={faCaretDown}
                    />
                )}
                <div
                    className={`position-absolute top-100 start-0 w-100 ${styles.select_dropdown}`}
                >
                    {displaySelect && (
                        <ListGroup ref={dropdownReference}>
                            {sortedItems.map((eachItem, _ind) => (
                                <ListGroup.Item
                                    action
                                    className={`${
                                        styles.select_dropdown_item
                                    } ${
                                        selectedItems.includes(_ind) &&
                                        ` ${styles.select_list_selected_item}`
                                    }`}
                                    id={`item-${_ind}`}
                                    key={
                                        typeof displayItemField === "string"
                                            ? eachItem[displayItemField] ===
                                              undefined
                                                ? eachItem
                                                : eachItem[displayItemField]
                                            : displayItemField(eachItem)
                                    }
                                    onMouseDown={(): void => {
                                        markItem(_ind);
                                    }}
                                >
                                    {typeof displayItemField === "string"
                                        ? eachItem[displayItemField] ===
                                          undefined
                                            ? eachItem
                                            : eachItem[displayItemField]
                                        : displayItemField(eachItem)}
                                    {selectedItems.includes(_ind) && (
                                        <span className="float-end">{"X"}</span>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
            </div>
            {!displaySelect && (
                <div className={`text-wrap ${styles.select_selected_display}`}>
                    {selectedItems.map((eachSelectedItem) => (
                        <div
                            className={`d-inline-block p-2 bg-secondary bg-opacity-25 rounded-pill m-1 text-nowrap ${styles.select_selected_item}`}
                            key={`${
                                displayItemField === undefined
                                    ? sortedItems[eachSelectedItem]
                                    : typeof displayItemField === "string"
                                    ? sortedItems[eachSelectedItem][
                                          displayItemField
                                      ]
                                    : displayItemField(
                                          sortedItems[eachSelectedItem],
                                      )
                            }-display-item`}
                            onClick={(): void => {
                                setSelectedItems((oldSelectedItems) => {
                                    if (oldSelectedItems?.length) {
                                        return oldSelectedItems.filter(
                                            (eachItem) =>
                                                eachItem !== eachSelectedItem,
                                        );
                                    }
                                    return oldSelectedItems;
                                });
                            }}
                            role="button"
                        >
                            {displayItemField === undefined
                                ? sortedItems[eachSelectedItem]
                                : typeof displayItemField === "string"
                                ? sortedItems[eachSelectedItem][
                                      displayItemField
                                  ]
                                : displayItemField(
                                      sortedItems[eachSelectedItem],
                                  )}
                            <span className="ms-2 fw-bold text-danger">
                                {"X"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
