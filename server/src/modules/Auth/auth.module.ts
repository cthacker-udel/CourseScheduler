import { Module } from "@nestjs/common";
import { CryptoModule } from "../Crypto/crypto.module";
import { UserModule } from "../User/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

/**
 * AuthModule,
 * @description
 * imports: `UserModule, CryptoModule`\
 * exports: []\
 * providers: `AuthService`\
 * controllers: []
 */
@Module({
    imports: [UserModule, CryptoModule],
    exports: [AuthService],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
