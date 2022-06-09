import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import type { SemesterTerm } from "./SemesterTerm";

@Schema()
export class Semester extends Document {
    /**
     * Term of the semester
     */
    @Prop()
    term: SemesterTerm;

    /**
     * Year of the semester
     */
    @Prop()
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
