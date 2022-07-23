import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createConnection } from "typeorm";
import { configurations, secrets } from "config";

async function init() {
    const app = await NestFactory.create(AppModule);
    await createConnection(secrets.MONGO_CONNECT_STRING);
    await app.listen(3001);
}
init();
