/**
 * DTO to create a course
 */
export class CreateCourseDTO {
    classSection: number;
    credits: number;
    description: string;
    labIds: string[];
    name: string;
    section: number;
    semesterIds?: string[];
    username: string;
}
