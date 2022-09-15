import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plan } from "src/entities/Plan/plan.entity";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";

/**
 * The plan module, exports the PlanService while importing the typeorm module for easy access to collection
 */
@Module({
    controllers: [PlanController],
    imports: [TypeOrmModule.forFeature([Plan], "mongo")],
    exports: [PlanService],
    providers: [PlanService],
})
export class PlanModule {}
