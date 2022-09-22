/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chunk from "lodash.chunk";
import React, { type ChangeEventHandler } from "react";
import { Form, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
} from "src/@types";
import type { CourseSortingActionType } from "src/@types/CourseSorting/CourseSortingAction";
import { CoursePagination } from "src/common";
import { initialCourseSortState, titleAbbreviationsToTitles } from "src/data";
import {
    generateSortingIcon,
    generateSortingOrderBy,
    generateTooltip,
    renderPreRequisites,
    truncateText,
} from "src/helpers";
import { useAllPlans } from "src/hooks/Plans/useAllPlans";
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
    TABLE_CELL_CLASS_NAME: "w-100 p-3 border",
    TABLE_HEADERS: ["Section", "Credits", "Description", "Name"],
    TABLE_SORTING_ICON_FIELDS: ["section", "credits", "description", "name"],
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const { plans } = useAllPlans();

    console.log(plans);

    return (
        <div>
            <span>{"Hello"}</span>
        </div>
    );
};
