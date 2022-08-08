/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chunk from "lodash.chunk";
import React from "react";
import { ListGroup, Pagination } from "react-bootstrap";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
    CourseTable,
} from "src/@types";
import { initialCourseSortState, initialCourseTableState } from "src/data";
import {
    generateSortingIcon,
    generateSortingOrderBy,
    generateTableColumns,
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

    const [tableColumns, setTableColumns] = React.useState<CourseTable>(
        initialCourseTableState,
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
        setTableColumns(generateTableColumns(segmentedCourses[page]));
    }, [page, segmentedCourses]);

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

    return (
        <>
            <div
                className={`${styles.course_table_header} my-3 w-25 mx-auto rounded border border-left border-right border-bottom-0 border-top-0 bg-secondary bg-opacity-25 fw-bold fs-4 text-center py-4`}
            >
                {"Course List"}
            </div>
            <div className={"mx-auto d-flex flex-row"}>
                <div className={"d-flex flex-column"}>
                    <div className="d-flex flex-row border-bottom mb-2">
                        <span>{"ID"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(sortingState.id.sort)}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({ type: "id" });
                            }}
                            role="button"
                        />
                    </div>
                    {tableColumns.ids.map((eachId, _ind) => (
                        <div
                            className={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "bg-light"
                                    : "bg-secondary bg-opacity-25"
                            }
                            key={`id-entry-${eachId}`}
                        >
                            {eachId}
                        </div>
                    ))}
                </div>
                <div>
                    <div className="d-flex flex-row">
                        <span>{"Name"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(sortingState.name.sort)}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({ type: "name" });
                            }}
                            role="button"
                        />
                    </div>
                    {tableColumns.names.map((eachName, _ind) => (
                        <div
                            className={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "bg-light"
                                    : "bg-secondary bg-opacity-25"
                            }
                            key={`id-entry-${eachName}`}
                        >
                            {eachName}
                        </div>
                    ))}
                </div>
                <div>
                    <div className="d-flex flex-row">
                        <span>{"Credits"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(
                                sortingState.credits.sort,
                            )}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({ type: "credits" });
                            }}
                            role="button"
                        />
                    </div>
                    {tableColumns.credits.map((eachCredit, _ind) => (
                        <div
                            className={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "bg-light"
                                    : "bg-secondary bg-opacity-25"
                            }
                            key={`id-entry-${eachCredit}`}
                        >
                            {eachCredit}
                        </div>
                    ))}
                </div>
                <div>
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
                    {tableColumns.descriptions.map((eachDescription, _ind) => (
                        <div
                            className={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "bg-light"
                                    : "bg-secondary bg-opacity-25"
                            }
                            key={`id-entry-${eachDescription}`}
                        >
                            {eachDescription ? (
                                truncateCourseDescription(
                                    eachDescription,
                                    CONSTANTS.DESCRIPTION_LENGTH,
                                )
                            ) : (
                                <span className="fw-light">
                                    {"No Description"}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div>
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
                    {tableColumns.preRequisites.map(
                        (eachPreRequisite, _ind) => (
                            <div
                                className={
                                    _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                    CONSTANTS.MOD_EVEN
                                        ? "bg-light"
                                        : "bg-secondary bg-opacity-25"
                                }
                                key={`id-entry-${eachPreRequisite}`}
                            >
                                {eachPreRequisite === "" ? (
                                    <span className="fw-light">
                                        {"No Pre-Requisites"}
                                    </span>
                                ) : (
                                    eachPreRequisite
                                )}
                            </div>
                        ),
                    )}
                </div>
                <div>
                    <div className="d-flex flex-row">
                        <span>{"Breadth Requirements"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(
                                sortingState.breadthRequirements.sort,
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
                    {tableColumns.breadthRequirements.map(
                        (eachBreadthRequirement, _ind) => (
                            <div
                                className={
                                    _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                    CONSTANTS.MOD_EVEN
                                        ? "bg-light"
                                        : "bg-secondary bg-opacity-25"
                                }
                                key={`id-entry-${eachBreadthRequirement}`}
                            >
                                {eachBreadthRequirement === "" ? (
                                    <span className="fw-light">
                                        {"No Breadth Satisfaction"}
                                    </span>
                                ) : (
                                    eachBreadthRequirement
                                )}
                            </div>
                        ),
                    )}
                </div>
            </div>
            <Pagination className="w-50 mx-auto d-flex flex-row justify-content-center">
                {segmentedCourses.map((_, i) => (
                    <Pagination.Item
                        active={page === i}
                        // eslint-disable-next-line react/no-array-index-key -- fine for pagination
                        key={`pagination-${i}`}
                        onClick={(): void => {
                            setPage(i);
                        }}
                    >
                        {i}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};
