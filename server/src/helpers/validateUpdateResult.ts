import type { UpdateResultValidation } from "src/@types";
import type { UpdateResult } from "typeorm";

export const validateUpdateResult = (
    result: UpdateResult,
): UpdateResultValidation => {
    return {
        updated: result.affected ? result.affected > 0 : false,
        ...result,
    };
};
