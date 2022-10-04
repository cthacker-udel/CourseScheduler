import type { SemesterTerm } from "src/@types";

export class CreateSemesterDTO {
    season: SemesterTerm;
    year: number;
    name: string;
}
