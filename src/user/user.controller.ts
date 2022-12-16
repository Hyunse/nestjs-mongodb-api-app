import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guard/authenticated.guard";
import { GetUser } from "src/common/decorator";
import { User } from "./schemas/user.schema";

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(AuthenticatedGuard)
  @Get('/get')
  getUser(@GetUser() user) {
    return user;
  }
}
