import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "config/config";
import { SchemaModule } from "./schemas/schema.module";
import { AuthModule } from "./modules/Auth/auth.module";
@Module({
    imports: [
        MongooseModule.forRoot(config.MONGO_CONNECT_STRING),
        SchemaModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
