import { Controller, Get, HttpStatus } from "@nestjs/common";

@Controller("status")
export class StatusController {
    @Get()
    async getStatus() {
        return { status: HttpStatus.OK };
    }
}
