import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @ObjectIdColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    hash: string;

    @Column()
    salt: string;

    @Column()
    iterations: number;

    @Column()
    lastLogin: Date;
}
