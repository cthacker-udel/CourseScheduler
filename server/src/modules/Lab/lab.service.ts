import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiError, ApiSuccess } from "src/@types";
import { CreateLabDTO } from "src/dto";
import { Lab } from "src/entities";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError, generateApiSuccess } from "src/helpers";
import { Repository } from "typeorm";

/**
 * Handles all database logic when it incorporates labs
 */
@Injectable()
export class LabService {
    /**
     * Logger instance
     */
    private readonly logger: Logger = new Logger(LabService.name);

    /**
     * 1-arg constructor to instantiate the DI injected labRepository
     *
     * @param labRepository - The mongo repository belonging to the lab instance
     */
    constructor(
        @InjectRepository(Lab, "mongo")
        private labRepository: Repository<Lab>,
    ) {}

    /**
     * Creates a lab given the information from the front-end in the request
     *
     * @param labInformation - The lab information from the front-end
     * @returns Whether the lab was created or not
     */
    createLab = async (
        labInformation: CreateLabDTO,
    ): Promise<ApiError | ApiSuccess> => {
        try {
            const result = await this.labRepository.save(labInformation);
            if (!result) {
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_CODES.LAB_CREATION_FAILED,
                );
            }
            return generateApiSuccess(HttpStatus.NO_CONTENT);
        } catch (error: unknown) {
            this.logger.error("Unable to create lab", (error as Error).stack);
            throw error;
        }
    };

    /**
     * Fetches all labs with the supplied matching courseId
     *
     * @param courseId - The courseId to filter the labs by
     * @returns The labs filtered by the courseId
     */
    getAllLabs = async (courseId: string): Promise<Lab[]> => {
        try {
            const result = await this.labRepository.find({
                where: { courseId },
            });
            return result;
        } catch (error: unknown) {
            this.logger.error(
                "Unable to fetch all labs",
                (error as Error).stack,
            );
            throw error;
        }
    };
}
