import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async signup(authDto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(authDto.password);
    // save the new user in the db
    const user = new this.userModel({ email: authDto.email, password: hash });
    const result = await user.save();

    return {
      result
    };
  }

  signin() {
    return 'Sign in';
  }
}
