import { Module } from "@nestjs/common";
import { CryptoModule } from "../Crypto/crypto.module";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { UserController } from "./users.controller";

/**
 * The user module, exports the UserService while importing the SchemaModule
 */
@Module({
    imports: [TypeOrmModule.forFeature([User], "mongo"), CryptoModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
