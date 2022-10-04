import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "labs" })
export class Lab {
    @ObjectIdColumn()
    id: number;

    @Column()
    courseName: string;

    @Column()
    courseSection: string;

    @Column()
    labSection: string;
}
