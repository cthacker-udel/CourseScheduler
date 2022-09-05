/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import {
    faSort,
    faSortDown,
    faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chunk from "lodash.chunk";
import React from "react";
import {
    Button,
    FloatingLabel,
    Form,
    Pagination,
    Placeholder,
    Table,
} from "react-bootstrap";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
} from "src/@types";
import { CoursePagination } from "src/common";
import { initialCourseSortState } from "src/data";
import { SORTING } from "src/enums";
import {
    generateSortingIcon,
    generateSortingOrderBy,
    truncateCourseDescription,
} from "src/helpers";
import { useCourses } from "src/hooks/useCourses";
import { CourseSortingReducer } from "src/reducer";

import _styles from "./Read.module.css";

/**
 * Constants for the Read component
 */
const CONSTANTS = {
    // eslint-disable-next-line no-magic-numbers -- no need
    COURSE_AMOUNT_SELECTIONS: [5, 10, 30, 60],
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

const TEXT_CONSTANTS = {
    NUMBER_OF_COURSES: "# of Courses",
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

    return (
        <>
            <div className="text-center mt-3 w-75 mx-auto">
                <div className="fs-4 mb-3 text-decoration-underline">
                    {"Course Viewer"}
                </div>
                <div className="border-bottom border-2 border-dark d-flex flex-row justify-content-around">
                    <span role="button">
                        {"Breadth Requirements "}
                        {
                            <FontAwesomeIcon
                                className="ps-1"
                                icon={generateSortingIcon(
                                    sortingState.breadthRequirements.sort,
                                )}
                            />
                        }
                    </span>
                    <span role="button">
                        {"Credits "}
                        {
                            <FontAwesomeIcon
                                className="ps-1"
                                icon={generateSortingIcon(
                                    sortingState.credits.sort,
                                )}
                            />
                        }
                    </span>
                    <span role="button">
                        {"Description "}
                        {
                            <FontAwesomeIcon
                                className="ps-1"
                                icon={generateSortingIcon(
                                    sortingState.description.sort,
                                )}
                            />
                        }
                    </span>
                    <span role="button">
                        {"Id "}
                        {
                            <FontAwesomeIcon
                                className="ps-1"
                                icon={generateSortingIcon(sortingState.id.sort)}
                            />
                        }
                    </span>
                    <span role="button">
                        {"Name "}
                        {
                            <FontAwesomeIcon
                                className="ps-1"
                                icon={generateSortingIcon(
                                    sortingState.name.sort,
                                )}
                            />
                        }
                    </span>
                    <span role="button">
                        {"Pre-Requisites"}{" "}
                        {
                            <FontAwesomeIcon
                                className="ps-1"
                                icon={generateSortingIcon(
                                    sortingState.credits.sort,
                                )}
                            />
                        }
                    </span>
                </div>
            </div>
            <CoursePagination
                currentPage={page}
                moveToPage={(pageNumber: number): void => {
                    setPage(pageNumber);
                }}
                pagesCount={segmentedCourses?.length}
                paginationSize="sm"
            />
        </>
    );
};
