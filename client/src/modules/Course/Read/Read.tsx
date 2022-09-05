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
    ListGroup,
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
    renderPreRequisites,
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
    INVALID_BREADTH_REQUIREMENTS: "No Breadth Requirements",
    INVALID_CREDITS: "No Credits",
    INVALID_DESCRIPTION: "No Description",
    INVALID_E_BREADTH: "No Elective Breadth",
    INVALID_PREREQUISITES: "No Pre-Requisites",
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

    console.log(segmentedCourses);

    return (
        <>
            <div className="text-center mt-3 w-75 mx-auto">
                <div className="fs-4 mb-3 text-decoration-underline">
                    {"Course Viewer"}
                </div>
                <Table bordered hover responsive striped>
                    <thead>
                        <tr>
                            <th
                                onClick={(): void => {
                                    setIsSorting(true);
                                    sortingDispatch({
                                        type: "breadthRequirements",
                                    });
                                }}
                                role="button"
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{"Breadth Requirements "}</span>
                                    <FontAwesomeIcon
                                        className="ps-1"
                                        icon={generateSortingIcon(
                                            sortingState.breadthRequirements
                                                .sort,
                                        )}
                                    />
                                </div>
                            </th>
                            <th
                                onClick={(): void => {
                                    setIsSorting(true);
                                    sortingDispatch({ type: "credits" });
                                }}
                                role="button"
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{"Credits "}</span>
                                    <FontAwesomeIcon
                                        className="ps-1"
                                        icon={generateSortingIcon(
                                            sortingState.credits.sort,
                                        )}
                                    />
                                </div>
                            </th>
                            <th
                                onClick={(): void => {
                                    setIsSorting(true);
                                    sortingDispatch({ type: "description" });
                                }}
                                role="button"
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{"Description "}</span>
                                    <FontAwesomeIcon
                                        className="ps-1"
                                        icon={generateSortingIcon(
                                            sortingState.description.sort,
                                        )}
                                    />
                                </div>
                            </th>
                            <th
                                onClick={(): void => {
                                    setIsSorting(true);
                                    sortingDispatch({ type: "id" });
                                }}
                                role="button"
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{"Id "}</span>
                                    <FontAwesomeIcon
                                        className="ps-1"
                                        icon={generateSortingIcon(
                                            sortingState.id.sort,
                                        )}
                                    />
                                </div>
                            </th>
                            <th
                                onClick={(): void => {
                                    setIsSorting(true);
                                    sortingDispatch({ type: "name" });
                                }}
                                role="button"
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{"Name "}</span>
                                    <FontAwesomeIcon
                                        className="ps-1"
                                        icon={generateSortingIcon(
                                            sortingState.name.sort,
                                        )}
                                    />
                                </div>
                            </th>
                            <th
                                onClick={(): void => {
                                    setIsSorting(true);
                                    sortingDispatch({ type: "preRequisites" });
                                }}
                                role="button"
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    <span>{"Pre-Requisites"}</span>
                                    <FontAwesomeIcon
                                        className="ps-1"
                                        icon={generateSortingIcon(
                                            sortingState.preRequisites.sort,
                                        )}
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {segmentedCourses[page].map((eachCourse: Course) => (
                            <tr
                                className={_styles.course_info}
                                key={eachCourse.id}
                            >
                                <td>
                                    {eachCourse.breadthRequirements ||
                                        TEXT_CONSTANTS.INVALID_BREADTH_REQUIREMENTS}
                                </td>
                                <td>
                                    {eachCourse.credits ||
                                        TEXT_CONSTANTS.INVALID_CREDITS}
                                </td>
                                <td>
                                    {truncateCourseDescription(
                                        eachCourse.description,
                                    ) || TEXT_CONSTANTS.INVALID_DESCRIPTION}
                                </td>
                                <td className="align-middle">
                                    {eachCourse.id}
                                </td>
                                <td>
                                    {
                                        eachCourse.name.split(" - ")[
                                            CONSTANTS.NAME_INDEX
                                        ]
                                    }
                                </td>
                                <td>
                                    {renderPreRequisites(
                                        eachCourse.preRequisites,
                                    ) ?? TEXT_CONSTANTS.INVALID_PREREQUISITES}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
