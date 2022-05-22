import { Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

/**
 * Schema for the user
 */
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;
}
