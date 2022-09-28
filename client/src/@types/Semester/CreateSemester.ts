import type { SEMESTERS } from "src/enums";

export type CreateSemester = {
    name: string;
    semester: SEMESTERS;
    year: number;
};
