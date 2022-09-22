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
import { CreatePlanDTO } from "src/dto";
import { Plan } from "src/entities/Plan/plan.entity";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { PlanService } from "./plan.service";

@Controller("plan")
export class PlanController {
    /**
     * Logger instance
     */
    private readonly logger = new Logger(PlanController.name);

    /**
     * One arg constructor which utilizes DI to populate the planService within the class
     *
     * @param planService - DI injected plan service
     */
    constructor(private readonly planService: PlanService) {}

    /**
     * Creates a plan under the user specified in the database
     *
     * @param createPlanRequest - The request to create the plan, contains userId, semesterIds, and name of plan
     * @returns - Whether the operation was successful or not, represented by the change to return a ApiError and ApiSuccess
     */
    @Post("add")
    async addPlan(
        @Body() createPlanRequest: CreatePlanDTO,
    ): Promise<ApiError | ApiSuccess> {
        try {
            const result = await this.planService.addPlan(createPlanRequest);
            return result;
        } catch (exception: unknown) {
            this.logger.error(
                "Failed to create plan",
                (exception as Error).stack,
            );
            return generateApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }

    /**
     * Fetches all plans belonging to the requester
     *
     * @param username - The username, which will be used to fetch the userId from the user associated with the username, and use that userId to fetch all plans with matching userId
     * @returns - All plans under the requester
     */
    @Get("all")
    async getAllPlans(
        @Query("username") username: string,
    ): Promise<Plan[] | ApiError> {
        try {
            const result = await this.planService.allPlans(username);
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Failed to fetch all plans",
                (error as Error).stack,
            );
            return generateApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }
}
