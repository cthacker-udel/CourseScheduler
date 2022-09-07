import type { ObjectLiteral } from "typeorm";

export type UpdateResultValidation = {
    affected?: number;
    generatedMaps: ObjectLiteral[];
    raw: any;
    updated: boolean;
};
