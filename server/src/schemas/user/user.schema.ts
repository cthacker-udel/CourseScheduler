import { Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

/**
 * Schema for the user
 */
@Schema()
export class User {
    /**
     * The email of the user
     */
    @Prop({ required: true })
    email: string;

    /**
     * The user's password hash
     */
    @Prop({ required: true })
    passwordHash: string;

    /**
     * The password salt
     */
    @Prop({ required: true })
    passwordSalt: string;
}
