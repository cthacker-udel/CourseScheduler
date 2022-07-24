import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "courses" })
export class Course {
    @ObjectIdColumn()
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
