import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    console.log(authDto)
    return this.authService.signup(authDto);
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
