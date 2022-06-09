import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "./course/course.schema";
import { Lab, LabSchema } from "./course/lab.schema";
import { Semester, SemesterSchema } from "./semester/semester.schema";
import { User, UserSchema } from "./user/user.schema";

@Module({
    imports: [MongooseModule],
    controllers: [],
    providers: [],
    exports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Course.name, schema: CourseSchema },
            { name: Lab.name, schema: LabSchema },
            { name: Semester.name, schema: SemesterSchema },
        ]),
    ],
})
export class SchemaModule {}
