import { Module } from "@nestjs/common";
import { ForgotController } from "./Forgot.controller";

@Module({
    controllers: [ForgotController],
    exports: [],
    imports: [],
    providers: [],
})
export class ForgotModule {}
