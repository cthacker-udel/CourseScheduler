/**
 * DTO to create a course
 */
export class CreateCourseDTO {
    title: string;
    desc?: string;
    credits?: number;
    section?: number;
    hasLab: boolean;
    labIds?: number[];
    semesterIds?: number[];
}
