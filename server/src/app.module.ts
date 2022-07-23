import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/Auth/auth.module";
import { UserModule } from "./modules/User/user.module";
import { CryptoModule } from "./modules/Crypto/crypto.module";

@Module({
    imports: [UserModule, AuthModule, CryptoModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule {}
