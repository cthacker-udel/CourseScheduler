/**
 * DTO to create a course
 */
export class CreateCourseDTO {
    classSection: string;
    credits: number;
    description: string;
    labIds: string[];
    name: string;
    section: string;
    semesterIds?: string[];
    username: string;
}
