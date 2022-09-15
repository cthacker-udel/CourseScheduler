import { Controller, Post } from "@nestjs/common";

@Controller()
export class PlanController {
    @Post()
    async addPlan(planData: PlanDTO) {
        console.log("adding plan");
    }
}
