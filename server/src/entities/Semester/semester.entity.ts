import { SemesterTerm } from "src/@types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Semester {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    term: SemesterTerm;

    @Column()
    year: number;

    @Column()
    title: string;

    @Column()
    description: string;
}