import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./modules/Auth/auth.service";
import { JwtAuthGuard } from "./modules/Auth/jwt-auth.guard";
import { LocalAuthGuard } from "./modules/Auth/local-auth.guard";

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("auth/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
