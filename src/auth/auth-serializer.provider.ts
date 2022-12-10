import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Document, Query, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(
    user: UserDocument,
    done: (err: Error, user: { id: any }) => void,
  ) {
    done(null, { id: user._id });
  }

  deserializeUser(
    payload: { id: string },
    done: (
      err: Error,
      user: Query<
        User &
          Document<any, any, any> & {
            _id: Types.ObjectId;
          },
        User &
          Document<any, any, any> & {
            _id: Types.ObjectId;
          },
        {},
        UserDocument
      >,
    ) => void,
  ) {
    const user = this.userService.findById(payload.id);
    done(null, user);
  }
}
