import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.signup(registerAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Req() req) {
    return {
      user: req.user
    }
  }

  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req);
  }
}
