/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable no-magic-numbers -- disabled */
/* eslint-disable comma-spacing -- disabled */
/* eslint-disable @typescript-eslint/comma-dangle -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./CoursePagination.module.css";

type CoursePaginationV2Properties<T> = {
    /**
     * The items to paginate
     */
    items: T[];
    /**
     * The current page
     */
    currentPage: number;
    /**
     * Items per page
     */
    itemsPerPage: number;

    /**
     * Update page function that takes in the page number and reflects it on the front-end
     */
    updatePage?: (_pageNumber: number) => void;
};

type CoursePaginationFunctionalSignature = <T>(
    _properties: CoursePaginationV2Properties<T>,
) => JSX.Element;

type PaginationPage = {
    page?: number;
    dots?: boolean;
};

/**
 *
 * @param props - The properties of the component
 */
export const CoursePaginationV2: CoursePaginationFunctionalSignature = <T,>({
    currentPage,
    items,
    itemsPerPage,
    updatePage,
}: CoursePaginationV2Properties<T>): JSX.Element => {
    const [paginatedItems, setPaginatedItems] = React.useState<T[][]>([]);
    const [pagesToDisplay, setPagesToDisplay] = React.useState<
        PaginationPage[]
    >([]);
    React.useEffect(() => {
        const accumulatedPaginatedItems: T[][] = [];
        let subPaginatedItemPage: T[] = [];
        for (const eachItem of items) {
            if (subPaginatedItemPage.length === itemsPerPage) {
                accumulatedPaginatedItems.push(subPaginatedItemPage);
                subPaginatedItemPage = [eachItem];
            } else {
                subPaginatedItemPage.push(eachItem);
            }
        }
        if (subPaginatedItemPage.length > 0) {
            accumulatedPaginatedItems.push(subPaginatedItemPage);
        }
        setPaginatedItems(accumulatedPaginatedItems);
    }, [items, itemsPerPage]);

    React.useEffect(() => {
        if (paginatedItems?.length > 10) {
            if (currentPage >= 7) {
                const min = currentPage - 2;
                let max = currentPage + 2;
                if (paginatedItems.length - currentPage <= 4) {
                    max = paginatedItems.length;
                }
                // Include 1 in the rendering and last page
                const availablePages = [{ page: 0 }, { dots: true }];
                for (let index = min; index < max; index += 1) {
                    availablePages.push({ page: index });
                }
                if (max !== paginatedItems.length) {
                    availablePages.push(
                        { dots: true },
                        { page: paginatedItems.length - 1 },
                    );
                }
                setPagesToDisplay(availablePages);
            } else {
                const min = 0;
                const max =
                    paginatedItems.length > 7 ? 7 : paginatedItems.length;
                const availablePages = [];
                for (let index = min; index < max; index += 1) {
                    availablePages.push({ page: index });
                }
                if (paginatedItems.length > 7) {
                    availablePages.push(
                        { dots: true },
                        { page: paginatedItems.length },
                    );
                }
                setPagesToDisplay(availablePages);
            }
        } else {
            setPagesToDisplay(
                Array.from({ length: paginatedItems.length })
                    .fill("")
                    .map((_, _ind) => ({ page: _ind })),
            );
        }
    }, [currentPage, items, paginatedItems]);

    // 1 ll, 1 l, 5 pages, 1 r, 1rr

    return (
        <div className="d-flex flex-row">
            <div
                className={`p-2 border ${styles.pagination_button} ${
                    currentPage === 0 && styles.pagination_button_disabled
                }`}
                onClick={(): void => {
                    if (currentPage > 0) {
                        updatePage?.(0);
                    }
                }}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </div>
            <div
                className={`p-2 border ${styles.pagination_button} ${
                    currentPage === 0 && styles.pagination_button_disabled
                }`}
                onClick={(): void => {
                    if (currentPage > 0) {
                        updatePage?.(currentPage - 1);
                    }
                }}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            {pagesToDisplay.map(
                (eachPaginationPage: PaginationPage, _ind: number) => {
                    if (eachPaginationPage.dots) {
                        return (
                            <div
                                className={`p-2 text-center border ${styles.pagination_button} ${styles.pagination_button_dots}`}
                                key={`pagination-${_ind}`}
                            >
                                {"..."}
                            </div>
                        );
                    }
                    if (eachPaginationPage.page !== undefined) {
                        return (
                            <div
                                className={`p-2 text-center border fw-bold ${
                                    styles.pagination_button
                                } ${
                                    _ind === currentPage &&
                                    styles.pagination_button_active
                                }`}
                                key={`pagination-${_ind}`}
                                onClick={(): void => {
                                    updatePage?.(_ind);
                                }}
                            >
                                {eachPaginationPage.page + 1}
                            </div>
                        );
                    }
                    return <span key={`pagination-${_ind}`} />;
                },
            )}
            <div
                className={`p-2 border ${styles.pagination_button} ${
                    currentPage === paginatedItems.length - 1 &&
                    styles.pagination_button_disabled
                }`}
                onClick={(): void => {
                    if (currentPage < paginatedItems.length - 1) {
                        updatePage?.(currentPage + 1);
                    }
                }}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <div
                className={`p-2 border ${styles.pagination_button} ${
                    currentPage === paginatedItems.length - 1 &&
                    styles.pagination_button_disabled
                }`}
                onClick={(): void => {
                    if (currentPage < paginatedItems.length - 1) {
                        updatePage?.(paginatedItems.length - 1);
                    }
                }}
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </div>
        </div>
    );
};
