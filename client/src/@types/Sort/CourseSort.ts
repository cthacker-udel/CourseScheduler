/* eslint-disable no-magic-numbers -- types are numbers, and name of type describes what the number is, so not magic */

import type { SORTING, TRAJECTORY } from "src/enums";

type CourseFieldSort = {
    sort: SORTING;
    trajectory: TRAJECTORY;
};

type CourseSort = {
    breadthRequirements: CourseFieldSort;
    credits: CourseFieldSort;
    description: CourseFieldSort;
    id: CourseFieldSort;
    name: CourseFieldSort;
    preRequisites: CourseFieldSort;
    section: CourseFieldSort;
};

export type { CourseFieldSort, CourseSort };
