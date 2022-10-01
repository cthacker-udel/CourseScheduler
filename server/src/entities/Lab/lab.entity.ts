import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "labs" })
export class Lab {
    @ObjectIdColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    section: number;

    @Column()
    courseId: string;
}
