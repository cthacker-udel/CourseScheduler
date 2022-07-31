import { Module } from "@nestjs/common";
import { StatusController } from "./Status.controller";

@Module({
    controllers: [StatusController],
    imports: [],
    exports: [],
    providers: [],
})
export class StatusModule {}
