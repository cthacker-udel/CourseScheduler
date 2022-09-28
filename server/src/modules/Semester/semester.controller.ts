import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiError, ApiSuccess } from "src/@types";
import { CreateSemesterDTO } from "src/dto";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { SemesterService } from "./semester.service";

@Controller("semester")
export class SemesterController {
    constructor(private semesterService: SemesterService) {}

    /**
     * Controller which receives the post request
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
}
