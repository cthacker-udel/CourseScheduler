/* eslint-disable @typescript-eslint/indent -- prettier/eslint conflict */
/* eslint-disable no-magic-numbers -- unnecessary for custom component */
/* eslint-disable @typescript-eslint/no-explicit-any -- generic component takes any as items */
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ListGroup } from "react-bootstrap";

import styles from "./MultiSelect.module.css";

const CONSTANTS = {
    LISTGROUP_DARK_ITEM: "list-group-item-dark",
};

type MultiSelectProperties = {
    caret?: boolean;
    customSort?: (_a: unknown, _b: unknown) => number;
    displayItemField?: string;
    items: any[];
    parentClassName?: string;
    pushSelectedItems?: (_items: any) => void;
};

/**
 * Common MultiSelect component, allows for any items to be passed in, and custom sorting algorithm as well on the items
 *
 * @param props - The properties of the MultiSelect
 * @param props.customSort - The custom sorting algorithm for the items in the MultiSelect
 * @param props.items - The items the MultiSelect component will be displaying
 * @returns The reusable MultiSelect component
 */
export const MultiSelect = ({
    caret,
    customSort,
    displayItemField,
    items,
    parentClassName,
    pushSelectedItems,
}: MultiSelectProperties): JSX.Element => {
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
                                        displayItemField
                                            ? eachItem[displayItemField]
                                            : eachItem
                                    }
                                    onMouseDown={(): void => {
                                        markItem(_ind);
                                    }}
                                >
                                    {displayItemField
                                        ? eachItem[displayItemField]
                                        : eachItem}
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
                                displayItemField
                                    ? sortedItems[eachSelectedItem][
                                          displayItemField
                                      ]
                                    : sortedItems[eachSelectedItem]
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
                            {displayItemField
                                ? sortedItems[eachSelectedItem][
                                      displayItemField
                                  ]
                                : sortedItems[eachSelectedItem]}
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
