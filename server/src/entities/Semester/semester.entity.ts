import { SemesterTerm } from "src/@types";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "semesters" })
export class Semester {
    @ObjectIdColumn()
    id: number;

    @Column()
    semester: SemesterTerm;

    @Column()
    year: number;

    @Column()
    name: string;

    @Column()
    courses: string[];

    @Column()
    username: string;
}
