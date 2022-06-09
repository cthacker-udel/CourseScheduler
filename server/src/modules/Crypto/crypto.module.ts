import { Module } from "@nestjs/common";
import { CryptoService } from "./crypto.service";

/**
 * CryptoModule, which exports the `encode` method,
 * which is used to encode the password with a secret
 */
@Module({
    imports: [],
    exports: [CryptoService],
    providers: [CryptoService],
    controllers: [],
})
export class CryptoModule {}
