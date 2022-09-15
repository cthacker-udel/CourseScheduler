import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiError, ApiSuccess } from "src/@types";
import { CreatePlanDTO } from "src/dto";
import { Plan } from "src/entities/Plan/plan.entity";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError, generateApiSuccess } from "src/helpers";
import { Repository } from "typeorm";

/**
 * The plan service, where database operations are executed
 */
@Injectable()
export class PlanService {
    /**
     * Logger instance
     */
    private readonly logger = new Logger(PlanService.name);

    /**
     * One arg constructor, which instantiates the plan repository
     *
     * @param planRepository - DI plan repository, allows for direct database operations strictly with that database
     */
    constructor(
        @InjectRepository(Plan, "mongo")
        private planRepository: Repository<Plan>,
    ) {}

    /**
     * Adds a plan to the database
     *
     * @param createPlanRequest - The request to add the plan
     * @returns - Whether the operation was a success or failure
     */
    addPlan = async (
        createPlanRequest: CreatePlanDTO,
    ): Promise<ApiSuccess | ApiError> => {
        try {
            const convertedEntity =
                this.planRepository.create(createPlanRequest);
            const result = await this.planRepository.save(convertedEntity);
            return result
                ? generateApiSuccess(HttpStatus.NO_CONTENT, result)
                : generateApiError(
                      HttpStatus.BAD_REQUEST,
                      ERROR_CODES.PLAN_CREATION_FAILED_ERROR_CODE,
                  );
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
    };
}
