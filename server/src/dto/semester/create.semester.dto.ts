import type { SemesterTerm } from "src/@types";

export class CreateSemesterDTO {
    term: SemesterTerm;
    year: number;
    title?: string;
    description?: string;
}
