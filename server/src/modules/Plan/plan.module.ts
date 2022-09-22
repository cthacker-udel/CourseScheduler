import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { Plan } from "src/entities/Plan/plan.entity";
import { UserModule } from "../User/user.module";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";

/**
 * The plan module, exports the PlanService while importing the typeorm module for easy access to collection
 */
@Module({
    controllers: [PlanController],
    imports: [TypeOrmModule.forFeature([Plan], "mongo"), UserModule],
    exports: [PlanService],
    providers: [PlanService],
})
export class PlanModule {}
