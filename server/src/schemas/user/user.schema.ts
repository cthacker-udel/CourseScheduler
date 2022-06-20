import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

/**
 * Schema for the user
 */
@Schema()
export class User {
    /**
     * The username of the user
     */
    @Prop({ required: true })
    username: string;
    /**
     * The email of the user
     */
    @Prop({ required: true })
    email: string;

    /**
     * The user's password hash
     */
    @Prop({ required: true })
    hash: string;

    /**
     * The password salt
     */
    @Prop({ required: true })
    salt: string;

    /**
     * The # of iterations applied in the pbkdf2 algorithm
     */
    @Prop({ required: true })
    iterations: number;

    /**
     * Last login
     */
    @Prop({ required: true })
    lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
