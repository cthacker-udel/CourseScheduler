import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import type { SemesterTerm } from "./SemesterTerm";

export type SemesterDocument = Semester & Document;
@Schema()
export class Semester extends Document {
    /**
     * Term of the semester
     */
    @Prop({ required: true })
    term: SemesterTerm;

    /**
     * Year of the semester
     */
    @Prop({ required: true })
    year: number;

    /**
     * Title of the semester
     */
    @Prop()
    title: string;

    /**
     * Description of semester
     */
    @Prop()
    description: string;
}

export const SemesterSchema = SchemaFactory.createForClass(Semester);
