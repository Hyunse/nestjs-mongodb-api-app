import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BookmarkDocument } from 'src/bookmark/schemas/bookmark.schema';

export type UserType = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true 
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    isRequired: false,
  })
  firstName: string;

  @Prop({
    isRequired: false,
  })
  lastName: string;

  @Prop({
    type: [Types.ObjectId], ref: 'Bookmark'

  })
  bookmarks: BookmarkDocument[]
}

export const UserSchema = SchemaFactory.createForClass(User);
