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
    ID_INDEX: 1,
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
            console.log("generatedSort = ", generatedSort);
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
            <Table
                bordered
                className={`${styles.course_table} w-75 mx-auto`}
                hover
                striped
            >
                <thead>
                    <tr>
                        <th>
                            <div className="d-flex flex-row">
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
                        <th>
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
                        <th>
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
                        </th>
                        <th>
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
                        <th>
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
                        <th>
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
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {segmentedCourses[page].map((eachCourse: Course) => (
                        <tr key={`course-${eachCourse.id}`}>
                            <td className="align-middle">
                                {eachCourse.id.split(" ")[CONSTANTS.ID_INDEX]}
                            </td>
                            <td className="align-middle">
                                {
                                    eachCourse.name.split(" - ")[
                                        CONSTANTS.NAME_INDEX
                                    ]
                                }
                            </td>
                            <td className="text-center align-middle">
                                {eachCourse.credits}
                            </td>
                            <td className="align-middle">
                                {eachCourse.description ? (
                                    truncateCourseDescription(
                                        eachCourse.description,
                                        CONSTANTS.DESCRIPTION_LENGTH,
                                    )
                                ) : (
                                    <span className="fw-light">
                                        {"No Description"}
                                    </span>
                                )}
                            </td>
                            <td className="align-middle">
                                {eachCourse.preRequisites === "" ? (
                                    <span className="fw-light">
                                        {"No Pre-Requisites"}
                                    </span>
                                ) : (
                                    eachCourse.preRequisites
                                )}
                            </td>
                            <td className="align-middle">
                                {eachCourse.breadthRequirements === "" ? (
                                    <span className="fw-light">
                                        {"No Breadth Satisfaction"}
                                    </span>
                                ) : (
                                    eachCourse.breadthRequirements
                                )}
                            </td>
                        </tr>
                    ))}
                    {segmentedCourses[page].length < pageSize &&
                        new Array(pageSize - segmentedCourses[page].length)
                            // eslint-disable-next-line no-magic-numbers -- disabled
                            .fill(0)
                            .map((_, i) => (
                                // eslint-disable-next-line react/no-array-index-key -- key not necessary for placeholder
                                <tr key={`placeholder-row-${i}`}>
                                    {new Array(CONSTANTS.PLACEHOLDER_FILL_SIZE)
                                        .fill(CONSTANTS.PLACEHOLDER_FILL)
                                        .map((__, j) => (
                                            <Placeholder
                                                animation="wave"
                                                as="td"
                                                bg="secondary"
                                                className="opacity-25"
                                                // eslint-disable-next-line react/no-array-index-key -- key not necessary for placeholder
                                                key={`placeholder-course-${j}`}
                                            />
                                        ))}
                                </tr>
                            ))}
                </tbody>
            </Table>
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
