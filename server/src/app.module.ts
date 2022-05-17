import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "config/config";
@Module({
  imports: [MongooseModule.forRoot(config.MONGO_CONNECT_STRING)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
