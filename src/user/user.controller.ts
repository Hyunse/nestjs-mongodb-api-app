import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/guard/authenticated.guard";

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(AuthenticatedGuard)
  @Get('/get')
  getUser(@Req() req) {
    return req.user;
  }
}
