import { Module } from "@nestjs/common";
import { StatusController } from "./status.controller";

@Module({
    controllers: [StatusController],
    imports: [],
    exports: [],
    providers: [],
})
export class StatusModule {}
