import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Course } from "./course.schema";

export type LabDocument = Lab & Document;

/**
 * Lab Schema Object, references Course schema via id
 */
@Schema()
export class Lab {
    /**
     * The lab's title
     */
    @Prop()
    title: string;

    /**
     * The lab's section
     */
    @Prop()
    section: number;

    /**
     * The course that this lab is attributed to
     */
    @Prop({ type: mongoose.Schema.Types.Number, ref: () => Course })
    courseId: number;
}

export const LabSchema = SchemaFactory.createForClass(Lab);
