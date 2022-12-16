import { Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guard/authenticated.guard";
import { GetUser } from "src/common/decorator";

@UseGuards(AuthenticatedGuard)
@Controller('user')
export class UserController {
  constructor() {}

  @Get('/get')
  getUser(@GetUser('_id') userId: number) {
    return userId;
  }

  @Patch()
  editUser() {

  }
}
