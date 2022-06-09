import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Semester } from "../semester/semester.schema";
import { Lab } from "./lab.schema";

export type CourseDocument = Course & Document;

/**
 * Course schema, the base course represented in mongoDB
 */
@Schema()
export class Course {
    /**
     * Course's title
     */
    @Prop({ required: true, default: null })
    title: string;

    /**
     * Course's desc
     */
    @Prop()
    desc: string;

    /**
     * Course's credits
     */
    @Prop()
    credits: number;

    /**
     * Course's section
     */
    @Prop()
    section: number;

    /**
     * Whether course has lab
     */
    @Prop({ required: true, default: false })
    hasLab: boolean;

    /**
     * References the lab that this class is attributed to
     */
    @Prop({ type: mongoose.Schema.Types.Number, ref: () => Lab })
    labIds: Lab[];

    /**
     * References the semesters that this course belongs to
     */
    @Prop({ type: mongoose.Schema.Types.Number, ref: () => Semester })
    semesterIds: Semester[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
