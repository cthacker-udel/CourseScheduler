import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lab } from "src/entities";
import { LabController } from "./lab.controller";
import { LabService } from "./lab.service";

@Module({
    controllers: [LabController],
    exports: [],
    imports: [TypeOrmModule.forFeature([Lab], "mongo")],
    providers: [LabService],
})
export class LabModule {}
