/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chunk from "lodash.chunk";
import React from "react";
import { Pagination, Placeholder, Table } from "react-bootstrap";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
} from "src/@types";
import { initialCourseSortState } from "src/data";
import {
    generateSortingIcon,
    generateSortingOrderBy,
    truncateCourseDescription,
} from "src/helpers";
import { useCourses } from "src/hooks/useCourses";
import { CourseSortingReducer } from "src/reducer";

import styles from "./Read.module.css";

/**
 * Constants for the Read component
 */
const CONSTANTS = {
    DEFAULT_PAGE: 0,
    DEFAULT_PAGE_SIZE: 10,
    DESCRIPTION_LENGTH: 75,
    EVEN_DIVISIBLE: 2,
    ID_INDEX: 1,
    MOD_EVEN: 0,
    NAME_INDEX: 1,
    PAGINATION_INC: 1,
    PLACEHOLDER_FILL: 0,
    PLACEHOLDER_FILL_SIZE: 6,
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const { courses, resetCourses, sortCourses } = useCourses({
        section: "CISC",
    });

    const [isSorting, setIsSorting] = React.useState<boolean>(false);

    const [pageSize, setPageSize] = React.useState<number>(
        CONSTANTS.DEFAULT_PAGE_SIZE,
    );

    const [page, setPage] = React.useState<number>(CONSTANTS.DEFAULT_PAGE);

    const segmentedCourses = React.useMemo(
        () => chunk(courses, pageSize),
        [pageSize, courses],
    );

    const [sortingState, sortingDispatch] = React.useReducer<
        CourseSortingReducerSignature,
        CourseSortingState
    >(
        CourseSortingReducer,
        initialCourseSortState,
        () => initialCourseSortState,
    );

    React.useEffect(() => {
        if (sortingState !== undefined) {
            const generatedSort = generateSortingOrderBy(sortingState);
            if (generatedSort.commenceSort && isSorting) {
                sortCourses(
                    generatedSort.sortingFields,
                    generatedSort.sortingOrder,
                );
                setIsSorting(false);
            } else if (isSorting) {
                resetCourses();
                setIsSorting(false);
            }
        }
    }, [isSorting, resetCourses, sortCourses, sortingState]);

    console.log(segmentedCourses[page]);

    return (
        <>
            <div className="rounded border border-left border-right border-bottom-0 border-top-0 bg-secondary bg-opacity-25 fw-bold fs-4 text-center my-3 p-2 w-50 mx-auto">
                {"Course List"}
            </div>
            <div>
                <Table
                    bordered
                    className={"w-75 mx-auto"}
                    hover
                    responsive
                    striped
                >
                    <thead>
                        <tr>
                            <th className="d-table-cell align-middle">
                                <div>
                                    <span>{"ID"}</span>
                                    <FontAwesomeIcon
                                        className="my-auto ps-2"
                                        icon={generateSortingIcon(
                                            sortingState.id.sort,
                                        )}
                                        onClick={(): void => {
                                            setIsSorting(true);
                                            sortingDispatch({ type: "id" });
                                        }}
                                        role="button"
                                    />
                                </div>
                            </th>
                            <th className="d-table-cell align-middle">
                                <div className="d-flex flex-row">
                                    <span>{"Name"}</span>
                                    <FontAwesomeIcon
                                        className="my-auto ps-2"
                                        icon={generateSortingIcon(
                                            sortingState.name.sort,
                                        )}
                                        onClick={(): void => {
                                            setIsSorting(true);
                                            sortingDispatch({ type: "name" });
                                        }}
                                        role="button"
                                    />
                                </div>
                            </th>
                            <th className="d-table-cell align-middle">
                                <div className="d-flex flex-row">
                                    <span>{"Credits"}</span>
                                    <FontAwesomeIcon
                                        className="my-auto ps-2"
                                        icon={generateSortingIcon(
                                            sortingState.credits.sort,
                                        )}
                                        onClick={(): void => {
                                            setIsSorting(true);
                                            sortingDispatch({
                                                type: "credits",
                                            });
                                        }}
                                        role="button"
                                    />
                                </div>
                            </th>
                            <th className="d-table-cell align-middle">
                                <div className="d-flex flex-row">
                                    <span>{"Description"}</span>
                                    <FontAwesomeIcon
                                        className="my-auto ps-2"
                                        icon={generateSortingIcon(
                                            sortingState.description.sort,
                                        )}
                                        onClick={(): void => {
                                            setIsSorting(true);
                                            sortingDispatch({
                                                type: "description",
                                            });
                                        }}
                                        role="button"
                                    />
                                </div>
                            </th>
                            <th className="d-table-cell align-middle">
                                <div className="d-flex flex-row">
                                    <span>{"Pre Requisites"}</span>
                                    <FontAwesomeIcon
                                        className="my-auto ps-2"
                                        icon={generateSortingIcon(
                                            sortingState.preRequisites.sort,
                                        )}
                                        onClick={(): void => {
                                            setIsSorting(true);
                                            sortingDispatch({
                                                type: "preRequisites",
                                            });
                                        }}
                                        role="button"
                                    />
                                </div>
                            </th>
                            <th className="d-table-cell align-middle">
                                <div className="d-flex flex-row">
                                    <span>{"Breadth Requirements"}</span>
                                    <FontAwesomeIcon
                                        className="my-auto ps-2"
                                        icon={generateSortingIcon(
                                            sortingState.breadthRequirements
                                                .sort,
                                        )}
                                        onClick={(): void => {
                                            setIsSorting(true);
                                            sortingDispatch({
                                                type: "breadthRequirements",
                                            });
                                        }}
                                        role="button"
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {segmentedCourses?.[page].map((eachCourse: Course) => (
                            <tr key={`course-${eachCourse.id}`}>
                                <td>{eachCourse.id}</td>
                                <td>{eachCourse?.name ?? "No Name"}</td>
                                <td>{eachCourse.credits}</td>
                                <td>
                                    {eachCourse?.description === ""
                                        ? "No Description"
                                        : truncateCourseDescription(
                                              eachCourse.description,
                                              CONSTANTS.DESCRIPTION_LENGTH,
                                          )}
                                </td>
                                <td>
                                    {eachCourse?.preRequisites === ""
                                        ? "No Pre-Requisites"
                                        : eachCourse.preRequisites}
                                </td>
                                <td>
                                    {eachCourse?.breadthRequirements === ""
                                        ? "No Breadth Requirements"
                                        : eachCourse.breadthRequirements}
                                </td>
                            </tr>
                        ))}
                        {segmentedCourses?.[page].length < pageSize &&
                            new Array(
                                pageSize - segmentedCourses?.[page].length,
                            )
                                .fill(CONSTANTS.PLACEHOLDER_FILL)
                                .map((_, placeholderRowIndex) => (
                                    <tr
                                        // eslint-disable-next-line react/no-array-index-key -- not needed for placeholder
                                        key={`placeholder-row-${placeholderRowIndex}`}
                                    >
                                        {new Array(
                                            CONSTANTS.PLACEHOLDER_FILL_SIZE,
                                        )
                                            .fill(CONSTANTS.PLACEHOLDER_FILL)
                                            .map(
                                                (
                                                    __,
                                                    placeholderRowDataIndex,
                                                ) => (
                                                    <Placeholder
                                                        animation="wave"
                                                        as="td"
                                                        // eslint-disable-next-line react/no-array-index-key -- not needed for placeholder
                                                        key={`placeholder-row-cell-${placeholderRowDataIndex}`}
                                                        xs={12}
                                                    />
                                                ),
                                            )}
                                    </tr>
                                ))}
                    </tbody>
                </Table>
            </div>
            <Pagination className="d-flex flex-row w-25 justify-content-center mx-auto">
                {segmentedCourses.map((_, i) => (
                    <Pagination.Item
                        active={page === i}
                        // eslint-disable-next-line react/no-array-index-key -- fine for pagination
                        key={`pagination-${i}`}
                        onClick={(): void => {
                            setPage(i);
                        }}
                    >
                        {i + CONSTANTS.PAGINATION_INC}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};
