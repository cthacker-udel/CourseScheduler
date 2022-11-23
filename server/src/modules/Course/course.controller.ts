import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Logger,
    Post,
    Req,
} from "@nestjs/common";
import { Request } from "express";
import { ApiError, ApiSuccess } from "src/@types";
import { CreateCourseDTO } from "src/dto";
import { Course } from "src/entities";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { CourseService } from "./course.service";

@Controller("course")
export class CourseController {
    private readonly logger: Logger = new Logger(CourseController.name);

    constructor(private courseService: CourseService) {}

    @Post("add")
    async addCourse(
        @Body() courseDTO: CreateCourseDTO,
    ): Promise<ApiError | ApiSuccess> {
        try {
            const result = await this.courseService.addCourse(courseDTO);
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Failed to create course",
                (error as Error).message,
            );
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }

    @Get("all")
    async getAllCourses(@Req() request: Request): Promise<Course[]> {
        try {
            const result = await this.courseService.getAllCourses(
                this.courseService.createCourseFromFilter(request.query),
            );
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Failed to fetch all courses",
                (error as Error).message,
            );
            return [];
        }
    }
}
