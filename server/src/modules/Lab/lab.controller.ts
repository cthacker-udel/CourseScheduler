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
import { CreateLabDTO } from "src/dto";
import { Lab } from "src/entities";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { LabService } from "./lab.service";

/**
 * Handles all api requests involving labs
 */
@Controller("lab")
export class LabController {
    /**
     * Logger instance
     */
    private readonly logger: Logger = new Logger(LabController.name);

    constructor(private readonly labService: LabService) {}

    /**
     * **POST** request for creating a lab
     *
     * @param createLabRequest - The request to create the lab from the front-end
     * @returns - ApiSuccess upon successful creation, and ApiError upon failure to create lab
     */
    @Post("add")
    async addLab(
        @Body() createLabRequest: CreateLabDTO,
    ): Promise<ApiError | ApiSuccess> {
        try {
            const result = await this.labService.createLab(createLabRequest);
            return result;
        } catch (error: unknown) {
            this.logger.error("Failed to create lab", (error as Error).stack);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.LAB_CREATION_FAILED,
            );
        }
    }

    /**
     * **GET** request to fetch all labs with the matching courseId supplied
     *
     * @param courseId - The courseId to filter all the labs by
     * @returns All the labs with the matching courseId supplied
     */
    @Get("all")
    async getAllLabs(@Query("courseName") courseName?: string): Promise<Lab[]> {
        try {
            const result = await this.labService.getAllLabs(courseName);
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Failed to fetch all labs",
                (error as Error).stack,
            );
            return [];
        }
    }

    @Get("exist")
    async doesSectionExist(
        @Query("courseName") courseName: string,
        @Query("courseSection") courseSection,
        @Query("desiredSection") desiredSection,
    ) {
        try {
            const result = await this.labService.doesSectionExist(
                courseName,
                courseSection,
                desiredSection,
            );
            return result;
        } catch (error: unknown) {
            this.logger.error("Failed to check if lab section exists");
            return true;
        }
    }
}
