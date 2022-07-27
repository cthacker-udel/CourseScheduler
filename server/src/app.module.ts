import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/Auth/auth.module";
import { UserModule } from "./modules/User/user.module";
import { CryptoModule } from "./modules/Crypto/crypto.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configurations } from "config";
import { LoggerOptions } from "typeorm";
import { ForgotModule } from "./modules/Forgot/Forgot.module";

@Module({
    imports: [
        UserModule,
        AuthModule,
        CryptoModule,
        TypeOrmModule.forRootAsync({
            name: "mongo",
            useFactory: () => ({
                type: "mongodb",
                database: configurations.mongo_typeorm.database,
                synchronize: configurations.mongo_typeorm.synchronize,
                logging: configurations.mongo_typeorm.logging as LoggerOptions,
                entities: configurations.mongo_typeorm.entities,
                autoLoadEntities: true,
                username: configurations.mongo_typeorm.username,
                password: configurations.mongo_typeorm.password,
                retryWrites: true,
                w: "majority",
                url: configurations.mongo_typeorm.url,
            }),
        }),
        ForgotModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
