import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Logger,
    Post,
    Query,
} from "@nestjs/common";
import { ApiError, ApiSuccess } from "src/@types";
import { CreateSemesterDTO } from "src/dto";
import { Semester } from "src/entities";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { SemesterService } from "./semester.service";

/**
 * Semester controller - handles front-end requests and calls appropriate services dependent on request
 */
@Controller("semester")
export class SemesterController {
    private logger: Logger;

    constructor(private semesterService: SemesterService) {}

    /**
     * POST request to add an semester to the database
     *
     * @param createSemesterRequest - The request to create the semester
     * @returns - Whether the request succeeded or not
     */
    @Post("add")
    async addSemester(
        @Body() createSemesterRequest: CreateSemesterDTO,
    ): Promise<ApiError | ApiSuccess> {
        try {
            const result = await this.semesterService.addSemester(
                createSemesterRequest,
            );
            return result;
        } catch (error: unknown) {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }

    /**
     * GET request to find all semesters with matching usernames of the one username that was passed in
     *
     * @param username - The username to find semesters with
     * @returns The semesters found with matching username
     */
    @Get("all")
    async getAllSemesters(
        @Query("username") username: string,
    ): Promise<Semester[]> {
        console.log("hit controller");
        try {
            const result = await this.semesterService.getAllSemesters(username);
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Failed to fetch all semesters",
                (error as Error).stack,
            );
            return [];
        }
    }
}
