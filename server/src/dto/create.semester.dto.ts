import type { SemesterTerm } from "src/schemas/semester/SemesterTerm";

export class CreateSemesterDTO {
    term: SemesterTerm;
    year: number;
    title?: string;
    description?: string;
}
