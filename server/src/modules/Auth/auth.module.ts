import { Module } from "@nestjs/common";
import { CryptoModule } from "../Crypto/crypto.module";
import { UserModule } from "../User/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import config from "config/config";
import { JwtStrategy } from "./jwt.strategy";

/**
 * AuthModule,
 * @description
 * imports: `UserModule, CryptoModule, and PassportModule`\
 * exports: []\
 * providers: `AuthService, LocalStrategy`\
 * controllers: []
 */
@Module({
    imports: [
        UserModule,
        CryptoModule,
        PassportModule,
        JwtModule.register({
            secret: config.SECRET,
            signOptions: { expiresIn: "30m" },
        }),
    ],
    exports: [],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [],
})
export class AuthModule {}
