import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Document, Query, Types } from 'mongoose';
import { User, UserType } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(
    user: any,
    done: (err: Error, user: { id: any }) => void,
  ) {
    // request.session
    done(null, { id: user._id });
  }

  async deserializeUser(
    payload: { id: string },
    done: (
      err: Error,
      user: any
    ) => void,
  ) {
    const user = await this.userService.findById(payload.id);

    if(!user) done(new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN), null);
    // Set request.user
    done(null, user);
  }
}
