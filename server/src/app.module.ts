import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "config/config";
import { AuthModule } from "./modules/Auth/auth.module";
import { UserModule } from "./modules/User/user.module";
import { CryptoModule } from "./modules/Crypto/crypto.module";
@Module({
    imports: [
        MongooseModule.forRoot(config.MONGO_CONNECT_STRING),
        UserModule,
        AuthModule,
        CryptoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule {}
