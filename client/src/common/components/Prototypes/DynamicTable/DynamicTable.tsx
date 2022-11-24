/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable no-unused-vars -- disabled */
/* eslint-disable no-shadow -- disabled */
/* eslint-disable no-magic-numbers -- disabled */
/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable comma-spacing -- disabled */
/* eslint-disable @typescript-eslint/comma-dangle -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
import {
    faSort,
    faSortDown,
    faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./DynamicTable.module.css";

// Coming soon, also, perhaps add editability in the  future?
type DynamicTableActionButton<E> = {
    random: E;
};

enum DynamicTableTheme {
    DARK = 0,
    LIGHT = 1,
}

enum DynamicTableSortingTrajectory {
    NO_TRAJECTORY = 0,
    MOVING_DOWN = 1,
    MOVING_UP = 2,
}

enum DynamicTableSorting {
    NO_DIRECTION = 0,
    ASCENDING = 1,
    DESCENDING = 2,
}

type DynamicTableColumnDefinition<E> = {
    sortingCaret?: boolean;
    sortingFunction?: (_argument1: E, _argument2: E) => number;
    onSort?: (..._arguments: any) => any;
    title: string;
};

type DynamicTableProperties<T> = {
    customSort?: (_argument1: T, _argument2: T) => number;
    customTableOverride?: string;
    customTableColumnRowOverride?: string;
    customTableColumnRowElementOverride?: string;
    customTablePaginationOverride?: string;
    customTablePerPageOverride?: string;
    customTableRowOverride?: string;
    customTableRowElementOverride?: string;
    columns?: DynamicTableColumnDefinition<T>[];
    displayPagination?: boolean;
    displayPerPage?: boolean;
    hoverEffect?: boolean;
    items: T[];
    theme: DynamicTableTheme;
};

const DynamicTableThemeMapping = [
    styles.dynamic_table_dark_theme,
    styles.dynamic_table_light_theme,
];

/**
 *
 * @param title
 * @param ind
 * @returns
 */
const generateSortingIcon = (title: string, ind: number): JSX.Element => {
    const foundColumn = document.querySelector(
        `dynamic-table-column-${title}-${ind}`,
    );
    if (foundColumn !== null) {
        const columnAsElement = foundColumn as HTMLElement;
        if (columnAsElement !== null) {
            const sortingStatus = Number(
                columnAsElement.dataset.sortDirection,
            ) as DynamicTableSorting;
            const sortingTrajectory = Number(
                columnAsElement.dataset.sortTrajectory,
            ) as DynamicTableSortingTrajectory;
            if (
                sortingStatus !== undefined &&
                sortingTrajectory !== undefined
            ) {
                switch (sortingStatus) {
                    case DynamicTableSorting.NO_DIRECTION: {
                        const newSorting =
                            sortingTrajectory ===
                            DynamicTableSortingTrajectory.NO_TRAJECTORY
                                ? DynamicTableSorting.DESCENDING
                                : sortingTrajectory ===
                                  DynamicTableSortingTrajectory.MOVING_DOWN
                                ? DynamicTableSorting.DESCENDING
                                : DynamicTableSorting.ASCENDING;
                        const newTrajectory =
                            newSorting === DynamicTableSorting.DESCENDING
                                ? DynamicTableSortingTrajectory.MOVING_UP
                                : DynamicTableSortingTrajectory.MOVING_DOWN;
                        columnAsElement.dataset.sortDirection =
                            newSorting.toString();
                        columnAsElement.dataset.sortTrajectory =
                            newTrajectory.toString();
                        return (
                            <FontAwesomeIcon
                                icon={
                                    newSorting ===
                                    DynamicTableSorting.DESCENDING
                                        ? faSortDown
                                        : faSortUp
                                }
                            />
                        );
                    }
                    case DynamicTableSorting.ASCENDING: {
                        const newSorting = DynamicTableSorting.NO_DIRECTION;
                        const newTrajectory =
                            DynamicTableSortingTrajectory.MOVING_DOWN;
                        columnAsElement.dataset.sortDirection =
                            newSorting.toString();
                        columnAsElement.dataset.sortTrajectory =
                            newTrajectory.toString();
                        return <FontAwesomeIcon icon={faSort} />;
                    }
                    case DynamicTableSorting.DESCENDING: {
                        const newSorting = DynamicTableSorting.NO_DIRECTION;
                        const newTrajectory =
                            DynamicTableSortingTrajectory.MOVING_UP;
                        columnAsElement.dataset.sortDirection =
                            newSorting.toString();
                        columnAsElement.dataset.sortTrajectory =
                            newTrajectory.toString();
                        return <FontAwesomeIcon icon={faSort} />;
                    }
                    default: {
                        break;
                    }
                }
            }
            return <FontAwesomeIcon icon={faSort} />;
        }
        return <FontAwesomeIcon icon={faSort} />;
    }
    return <FontAwesomeIcon icon={faSort} />;
};

/**
 *
 * @returns - The dynamic table element
 */
export const DynamicTable = <T,>({
    customSort,
    customTableOverride,
    customTableColumnRowOverride,
    customTableColumnRowElementOverride,
    customTablePaginationOverride,
    customTablePerPageOverride,
    customTableRowOverride,
    customTableRowElementOverride,
    columns,
    displayPagination,
    displayPerPage,
    hoverEffect,
    items,
    theme = DynamicTableTheme.DARK,
}: DynamicTableProperties<T>): JSX.Element => (
    <div className={`${styles.dynamic_table} ${customTableOverride ?? ""}`}>
        <div
            className={`${styles.dynamic_table_column_row} ${
                customTableColumnRowOverride ?? ""
            }`}
        >
            {columns !== undefined &&
                columns.length > 0 &&
                columns.map(
                    (
                        eachDefinition: DynamicTableColumnDefinition<T>,
                        _ind: number,
                    ) => (
                        <div
                            className={`${
                                styles.dynamic_table_column_row_element
                            } ${DynamicTableThemeMapping[theme]} ${
                                customTableColumnRowElementOverride ?? ""
                            }`}
                            id={`dynamic-table-column-${eachDefinition.title}- ${_ind}`}
                            key={`dynamic-table-column-${_ind}`}
                        >
                            <div
                                className="position-relative"
                                data-sortDirection="0"
                                data-sortTrajectory="-1"
                            >
                                {eachDefinition.title}
                                {generateSortingIcon(
                                    eachDefinition.title,
                                    _ind,
                                )}
                            </div>
                        </div>
                    ),
                )}
        </div>
    </div>
);
