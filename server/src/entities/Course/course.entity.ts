import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    desc: string;

    @Column()
    credits: number;

    @Column()
    section: number;

    @Column()
    hasLab: boolean;

    @Column()
    labIds: string[];

    @Column()
    semesterIds: string[];
}
