import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "src/entities";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";

/**
 * Course module, handles imports/exports for DI integration
 */
@Module({
    exports: [],
    controllers: [CourseController],
    providers: [CourseService],
    imports: [TypeOrmModule.forFeature([Course], "mongo")],
})
export class CourseModule {}
