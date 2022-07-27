import { Module } from "@nestjs/common";
import { AuthModule } from "../Auth/auth.module";
import { CryptoModule } from "../Crypto/crypto.module";
import { UserModule } from "../User/user.module";
import { ForgotController } from "./Forgot.controller";
import { ForgotService } from "./Forgot.service";

@Module({
    controllers: [ForgotController],
    exports: [ForgotService],
    imports: [AuthModule, UserModule, CryptoModule],
    providers: [ForgotService],
})
export class ForgotModule {}
