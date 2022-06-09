import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * To avoid magic strings, this is a local guard that will be utilized in subsequent calls to `UseAuthGuards`
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
