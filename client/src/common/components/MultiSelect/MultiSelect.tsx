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
    const [selectedItem, setSelectedItem] = React.useState();
    const [displaySelect, setDisplaySelect] = React.useState<boolean>(false);
    const dropdownReference = React.createRef<HTMLDivElement>();

    return (
        <div
            className={`${parentClassName} d-flex flex-row justify-content-end p-2 border border-2 rounded position-relative ${styles.select_container}`}
            onBlurCapture={(): void => {
                setDisplaySelect(false);
            }}
            onClick={(): void => {
                setDisplaySelect(!displaySelect);
                if (dropdownReference?.current) {
                    dropdownReference.current.focus();
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
                        {items.map((eachItem) => (
                            <ListGroup.Item
                                action
                                className={styles.select_dropdown_item}
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
