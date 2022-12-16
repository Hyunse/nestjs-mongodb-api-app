import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.signup(registerAuthDto);
  }

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
