import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async signup(authDto: AuthDto) {
    // Variables
    const email = authDto.email;
    const password = authDto.password;

    // Check User
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    // Generate the password hash
    const hashedPassword = await argon.hash(password);
    // Save the new user in the db
    const newUser = await this.userModel.create({ email, password: hashedPassword });



    return {
      ok: true,
      message: 'Created user'
    };
  }

  async signin(authDto: AuthDto) {
    // Variables
    const email = authDto.email;
    const password = authDto.password;

    const loginUser = await this.userModel.findOne({ email });

    if (!loginUser) {
      throw new HttpException('Wrong email or password', HttpStatus.FORBIDDEN);
    }

    // Verify password is right or not
    const result = await argon.verify(loginUser.password, password);

    if (!result) {
      throw new HttpException('Wrong email or password', HttpStatus.FORBIDDEN);
    }


    return {
      ok: true,
      message: 'logined'
    };
  }
  
  logout() {
    return {
      ok: true,
      message: 'Successfully logout'
    }
  }
}
