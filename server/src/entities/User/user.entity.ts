import { ResetToken } from "../SubEntities";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @ObjectIdColumn()
    /**
     * The id of the user
     */
    id: number;

    @Column()
    /**
     * The username associated with the user
     */
    username: string;

    @Column()
    /**
     * The email associated with the user
     */
    email: string;

    @Column()
    /**
     * The password hash generated for the user
     */
    hash: string;

    @Column()
    /**
     * The password salt generated for the user
     */
    salt: string;

    @Column()
    /**
     * The # of iterations the user's password has to undergo to be decrypted, using the pbkdf2 algorithm
     */
    iterations: number;

    @Column()
    /**
     * The collection of reset tokens the user has
     */
    resetToken: ResetToken;

    @Column()
    /**
     * The last time the user logged in
     */
    lastLogin: Date;
}
