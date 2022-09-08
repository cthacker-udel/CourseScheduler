import { SemesterTerm } from "src/@types";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "semesters" })
export class Semester {
    @ObjectIdColumn()
    id: number;

    @Column()
    term: SemesterTerm;

    @Column()
    year: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    courses: string[];
}
