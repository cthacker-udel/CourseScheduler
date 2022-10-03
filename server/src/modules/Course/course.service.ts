import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/entities";
import { Repository } from "typeorm";
import { CreateCourseDTO } from "src/dto";
import { generateApiError, generateApiSuccess } from "src/helpers";
import { ERROR_CODES } from "src/ErrorCode";
import { ApiError, ApiSuccess } from "src/@types";

@Injectable()
export class CourseService {
    private readonly logger: Logger = new Logger(CourseService.name);

    /**
     * One-arg constructor to inject the course repository into the CourseService
     *
     * @param courseRepository - DI injected courseRepository
     */
    constructor(
        @InjectRepository(Course, "mongo")
        private courseRepository: Repository<Course>,
    ) {}

    /**
     * Creates a course in the database
     *
     * @param request - The request to add a current course to the repository
     * @returns Whether or not the request was a success
     */
    addCourse = async (
        request: CreateCourseDTO,
    ): Promise<ApiError | ApiSuccess> => {
        try {
            const result = await this.courseRepository.save(request);
            if (!result) {
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_CODES.COURSE_CREATION_FAILED,
                );
            }
            return generateApiSuccess(HttpStatus.NO_CONTENT);
        } catch (error: unknown) {
            this.logger.error(
                "Failed to create course",
                (error as Error).message,
            );
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.COURSE_CREATION_FAILED,
            );
        }
    };

    /**
     * Gets all courses with the username `username` passed in
     *
     * @param username - the username to filter all the courses by
     * @returns All the courses filtered by the username
     */
    getAllCourses = async (username: string): Promise<Course[]> => {
        try {
            const result = await this.courseRepository.find({
                where: { username },
            });
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Failed to fetch all courses",
                (error as Error).message,
            );
            return [];
        }
    };
}
