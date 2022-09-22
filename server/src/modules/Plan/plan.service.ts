import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiError, ApiSuccess } from "src/@types";
import { CreatePlanDTO } from "src/dto";
import { Plan } from "src/entities/Plan/plan.entity";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError, generateApiSuccess } from "src/helpers";
import { Repository } from "typeorm";
import { UserService } from "../User/user.service";

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
        private userService: UserService,
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
            const foundUser = await this.userService.findUserByUsername(
                createPlanRequest.username,
            );
            if (!foundUser) {
                Logger.error("Unable to find user who created plan");
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_CODES.USER_DOES_NOT_EXIST,
                );
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- disabled until fixed
            const { username: _username, ...rest } = createPlanRequest;
            const convertedEntity = this.planRepository.create({
                ...rest,
                userId: foundUser.id,
            });
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

    /**
     * Fetches all plans from the database with the userId associated with the requester's id
     *
     * @param username - The requester's username
     * @returns - The plans (if exist) that match the userId of the user who's username matches the username passed in
     */
    allPlans = async (username: string): Promise<Plan[] | ApiError> => {
        try {
            const foundUser = await this.userService.findUserByUsername(
                username,
            );
            if (!foundUser) {
                Logger.error(
                    "Unable to find user for whom to fetch all plans under",
                );
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_CODES.USER_DOES_NOT_EXIST,
                );
            }
            const plans = this.planRepository.find({
                where: { userId: foundUser.id },
            });
            return plans;
        } catch (error: unknown) {
            Logger.error("Unable to fetch all plans", (error as Error).stack);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    };
}
