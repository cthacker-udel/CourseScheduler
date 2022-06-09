import { Module } from "@nestjs/common";
import { SchemaModule } from "src/schemas/schema.module";
import { UserService } from "./user.service";

@Module({
    imports: [SchemaModule],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
