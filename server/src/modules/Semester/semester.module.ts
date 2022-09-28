import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Semester } from "src/entities";
import { SemesterController } from "./semester.controller";
import { SemesterService } from "./semester.service";

/**
 * The semester module, which controls which gets imported, and which gets exported
 */
@Module({
    imports: [TypeOrmModule.forFeature([Semester], "mongo")],
    exports: [],
    providers: [SemesterService],
    controllers: [SemesterController],
})
export class SemesterModule {}
