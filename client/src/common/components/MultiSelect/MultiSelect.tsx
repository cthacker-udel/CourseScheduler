/* eslint-disable no-magic-numbers -- unnecessary for custom component */
/* eslint-disable @typescript-eslint/no-explicit-any -- generic component takes any as items */
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import styles from "./MultiSelect.module.css";

type MultiSelectProperties = {
    caret?: boolean;
    customSort?: (_a: unknown, _b: unknown) => number;
    displayItemField?: string;
    items: any[];
    parentClassName?: string;
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
}: MultiSelectProperties): JSX.Element => {
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [availableItems, setAvailableItems] = React.useState(items);
    const [selectedItem, setSelectedItem] = React.useState<number | undefined>(
        0,
    );
    const [displaySelect, setDisplaySelect] = React.useState<boolean>(false);
    const dropdownReference = React.createRef<HTMLDivElement>();

    const markItem = React.useCallback((index: number) => {
        const selectedItemToMark = document.querySelector(`#item-${index}`);
        if (selectedItemToMark) {
            if (!selectedItemToMark.className.includes(" selected")) {
                selectedItemToMark.className = `${selectedItemToMark.className} selected`;
            } else if (selectedItemToMark.className.includes(" selected")) {
                selectedItemToMark.className =
                    selectedItemToMark.className.replace(" selected", "");
            }
        }
    }, []);

    React.useEffect(() => {
        if (
            displaySelect &&
            selectedItem !== undefined &&
            selectedItem >= 0 &&
            selectedItem < items.length
        ) {
            const semesterOption = document.querySelector(
                `#item-${selectedItem}`,
            );
            const semesterDivElementAbove = document.querySelector(
                `#item-${selectedItem - 1}`,
            );
            const semesterDivElementBelow = document.querySelector(
                `#item-${selectedItem + 1}`,
            );
            if (semesterDivElementAbove) {
                semesterDivElementAbove.className =
                    semesterDivElementAbove.className.replace(
                        "list-group-item-dark",
                        "",
                    );
            }
            if (semesterDivElementBelow) {
                semesterDivElementBelow.className =
                    semesterDivElementBelow.className.replace(
                        "list-group-item-dark",
                        "",
                    );
            }
            if (semesterOption) {
                const semesterDivElement: HTMLDivElement =
                    semesterOption as HTMLDivElement;
                semesterDivElement.className = `${semesterDivElement.className} list-group-item-dark`;
                semesterDivElement?.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [displaySelect, selectedItem, items.length]);

    return (
        <div
            className={`${parentClassName} d-flex flex-row justify-content-end p-2 border border-2 rounded position-relative ${styles.select_container}`}
            onBlurCapture={(): void => {
                setDisplaySelect(false);
                setSelectedItem(0);
            }}
            onClick={(): void => {
                setDisplaySelect(!displaySelect);
                if (dropdownReference?.current) {
                    dropdownReference.current.focus();
                }
            }}
            onKeyDown={(event_: React.KeyboardEvent<HTMLDivElement>): void => {
                const { key } = event_;
                switch (key) {
                    case "ArrowUp": {
                        if (selectedItem !== undefined && selectedItem > 0) {
                            setSelectedItem(selectedItem - 1);
                        }
                        break;
                    }
                    case "ArrowDown": {
                        if (
                            selectedItem !== undefined &&
                            selectedItem < items.length - 1
                        ) {
                            setSelectedItem(selectedItem + 1);
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }}
            role="button"
            tabIndex={1}
        >
            {caret && (
                <FontAwesomeIcon className="pe-2 my-auto" icon={faCaretDown} />
            )}
            <div
                className={`position-absolute top-100 start-0 w-100 ${styles.select_dropdown}`}
            >
                {displaySelect && (
                    <ListGroup ref={dropdownReference}>
                        {items.map((eachItem, _ind) => (
                            <ListGroup.Item
                                action
                                className={styles.select_dropdown_item}
                                id={`item-${_ind}`}
                                key={
                                    displayItemField
                                        ? eachItem[displayItemField]
                                        : eachItem
                                }
                            >
                                {displayItemField
                                    ? eachItem[displayItemField]
                                    : eachItem}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
        </div>
    );
};
