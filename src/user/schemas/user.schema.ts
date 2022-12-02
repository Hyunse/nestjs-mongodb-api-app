import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String
  })
  email: string;

  @Prop({
    type: String
  })
  password: string;

  @Prop({
    type: String,
    isRequired: false,
  })
  firstName: string;

  @Prop({
    type: String,
    isRequired: false,
  })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
