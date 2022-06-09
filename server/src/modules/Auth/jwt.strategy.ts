import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import config from "config/config";

/**
 * The Passport JWT strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * Super call to specify the details of the strategy, initialize it with the secret, and how the jwt will be extracted
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.SECRET,
        });
    }

    /**
     * This function receives a decoded JWT, and returns the sub and username from the decoded object
     * @param payload The decoded JWT
     * @returns The decoded JWT with userId and username as an object
     */
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
