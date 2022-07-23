import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lab {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    section: number;

    @Column()
    courseId: number;
}
