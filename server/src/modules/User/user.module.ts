import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user/user.schema";
import { CryptoModule } from "../Crypto/crypto.module";
import { UserService } from "./user.service";

/**
 * The user module, exports the UserService while importing the SchemaModule
 */
@Module({
    imports: [
        CryptoModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [],
    providers: [UserService],
    exports: [
        UserService,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
})
export class UserModule {}
