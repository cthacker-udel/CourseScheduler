/* eslint-disable @typescript-eslint/indent -- prettier/eslint conflict */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- disabled for testing purposes */
/* eslint-disable no-magic-numbers -- not necessary */
import React from "react";
import { Pagination } from "react-bootstrap";

import styles from "./CoursePagination.module.css";

const CONSTANTS = {
    BASE_PAGE: 0,
    BASE_PAGINATION_LENGTH: 5,
    ITEMS_PER_PAGE: [5, 10, 20, 30, 50],
    PAGINATION_BASE_ARRAY: [1, 2, 3, 4, 5],
    PAGINATION_GEN_ARRAY: [-2, -1, 0, 1, 2],
};

type CustomPaginationItemStyles = "course";

type CoursePaginationProperties = {
    currentPage: number;
    customItemStyle?: CustomPaginationItemStyles;
    moveToPage: (_pageNumber: number) => void;
    pagesCount: number;
    paginationSize: "lg" | "sm";
};

/**
 * Reusable pagination component
 *
 * @param props - The properties of the component
 * @param props.pagesCount - The # of pages to render in the pagination display
 * @param props.paginationSize - The size of the pagination items, can either be "sm" or "lg"
 * @returns Reusable pagination component
 */
export const CoursePagination = ({
    currentPage,
    customItemStyle,
    moveToPage,
    pagesCount,
    paginationSize,
}: CoursePaginationProperties): JSX.Element => {
    const [currentPageStart, setCurrentPageStart] = React.useState(0);
    const [lastPage, setLastPage] = React.useState<boolean>(false);

    const generatePaginationContent = React.useCallback(
        (
            totalLength: number,
            length: number,
            clickFunction: (_pageNumber: number) => void,
        ) =>
            Array.from<number>({ length })
                .fill(0)
                .map<number>((_, _ind) => _ind + currentPageStart)
                .map<JSX.Element>((eachElement) => {
                    if (eachElement + 1 <= totalLength) {
                        return (
                            <Pagination.Item
                                active={eachElement === currentPage}
                                className={`${
                                    customItemStyle
                                        ? styles[`item_${customItemStyle}`]
                                        : ""
                                }`}
                                key={`page-${eachElement + currentPage}`}
                                onClick={(): void => clickFunction(eachElement)}
                            >
                                {eachElement + 1}
                            </Pagination.Item>
                        );
                    }
                    return <div key={`page-${eachElement + currentPage}`} />;
                }),
        [currentPage, currentPageStart, customItemStyle],
    );

    React.useEffect(() => {
        const pageDifference = Math.abs(currentPage - pagesCount);
        if (pageDifference > 5 && currentPage % 5 === 0) {
            setCurrentPageStart(currentPage);
            setLastPage(false);
        } else if (pageDifference <= 5 && !lastPage) {
            let temporaryCurrentPage = currentPage;
            while (
                Math.abs(temporaryCurrentPage - pagesCount) !== 5 &&
                temporaryCurrentPage >= 1
            ) {
                temporaryCurrentPage -= 1;
            }
            setCurrentPageStart(temporaryCurrentPage);
            setLastPage(true);
        } else if (pageDifference > 5 && lastPage) {
            let temporaryCurrentPage = currentPage;
            while (
                temporaryCurrentPage % 5 !== 0 &&
                temporaryCurrentPage >= 1
            ) {
                temporaryCurrentPage -= 1;
            }
            setCurrentPageStart(temporaryCurrentPage);
            setLastPage(false);
        }
    }, [currentPage, pagesCount, lastPage]);

    return (
        <div className="d-flex flex-row justify-content-center">
            <Pagination size={paginationSize}>
                {pagesCount >= 3 ? (
                    <>
                        <Pagination.First
                            className={`${
                                customItemStyle
                                    ? styles[`item_${customItemStyle}`]
                                    : ""
                            }`}
                            disabled={currentPage === 0}
                            onClick={(): void => moveToPage(0)}
                        />
                        <Pagination.Prev
                            className={`${
                                customItemStyle
                                    ? styles[`item_${customItemStyle}`]
                                    : ""
                            }`}
                            disabled={currentPage === 0}
                            onClick={(): void => moveToPage(currentPage - 1)}
                        />
                        {generatePaginationContent(
                            pagesCount,
                            CONSTANTS.BASE_PAGINATION_LENGTH,
                            (pageNumber: number) => moveToPage(pageNumber),
                        )}
                        {!lastPage && (
                            <>
                                <Pagination.Ellipsis
                                    className={`${
                                        customItemStyle
                                            ? styles[`item_${customItemStyle}`]
                                            : ""
                                    }`}
                                    disabled
                                />
                                <Pagination.Item
                                    className={`${
                                        customItemStyle
                                            ? styles[`item_${customItemStyle}`]
                                            : ""
                                    }`}
                                    onClick={(): void =>
                                        moveToPage(pagesCount - 1)
                                    }
                                >
                                    {pagesCount}
                                </Pagination.Item>
                            </>
                        )}
                        <Pagination.Next
                            className={`${
                                customItemStyle
                                    ? styles[`item_${customItemStyle}`]
                                    : ""
                            }`}
                            disabled={currentPage + 1 >= pagesCount}
                            onClick={(): void => moveToPage(currentPage + 1)}
                        />
                        <Pagination.Last
                            className={`${
                                customItemStyle
                                    ? styles[`item_${customItemStyle}`]
                                    : ""
                            }`}
                            disabled={currentPage + 1 >= pagesCount}
                            onClick={(): void => moveToPage(pagesCount - 1)}
                        />
                    </>
                ) : (
                    <div className="bg-primary bg-opacity-25 rounded-3 p-3 fw-bold">
                        {"No Pages Available"}
                    </div>
                )}
            </Pagination>{" "}
        </div>
    );
};
