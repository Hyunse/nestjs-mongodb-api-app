import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async signup({ email, password, firstName, lastName }: RegisterAuthDto) {
    // Variables

    // Check User
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    // Generate the password hash
    const hashedPassword = await argon.hash(password);
    // Save the new user in the db
    await this.userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return {
      ok: true,
      message: 'Created user',
      user: {
        email,
        firstName,
        lastName,
      },
    };
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    // Variables
    const email = loginAuthDto.email;
    const password = loginAuthDto.password;
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
      _id: loginUser._id,
      email: loginUser.email,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
    };
  }

  logout(req: any) {
    console.log(req.session);
    // req.session.destroy();
    return {
      ok: true,
      message: 'Successfully logout',
    };
  }
}
