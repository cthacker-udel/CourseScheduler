import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiError, ApiSuccess } from "src/@types";
import { CreateSemesterDTO } from "src/dto";
import { Semester } from "src/entities";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError, generateApiSuccess } from "src/helpers";
import { Repository } from "typeorm";

/**
 * The service, which handles all the database logic for adding a semester
 */
@Injectable()
export class SemesterService {
    /**
     * Logger instance
     */
    private readonly logger = new Logger(SemesterService.name);

    constructor(
        @InjectRepository(Semester, "mongo")
        private semesterRepository: Repository<Semester>,
    ) {}

    /**
     * Creates a semester in the mongo database
     *
     * @param addSemesterRequest - The request to create the semester
     * @returns - Whether the semester was created successfully, or the creation failed
     */
    addSemester = async (
        addSemesterRequest: CreateSemesterDTO,
    ): Promise<ApiSuccess | ApiError> => {
        try {
            const { name } = addSemesterRequest;
            const foundSemester = await this.semesterRepository.findOne({
                where: { name },
            });
            if (!foundSemester) {
                // create semester
                const result = await this.semesterRepository.save(
                    addSemesterRequest,
                );
                if (result) {
                    return generateApiSuccess(HttpStatus.NO_CONTENT);
                }
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_CODES.UNKNOWN_SERVER_FAILURE,
                );
            }
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.SEMESTER_ALREADY_EXISTS_ERROR_CODE,
            );
        } catch (error: unknown) {
            this.logger.error(
                "Failed to create semester",
                (error as Error).stack,
            );
            return generateApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    };
}
