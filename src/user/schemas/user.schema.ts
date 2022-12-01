import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: String;

  @Prop()
  password: String;

  @Prop({
    isRequired: false,
  })
  firstName: String;

  @Prop({
    isRequired: false,
  })
  lastName: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
