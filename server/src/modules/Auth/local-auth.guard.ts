import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

/**
 * To avoid magic strings, this is an Auth Guard that uses the local strategy
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
