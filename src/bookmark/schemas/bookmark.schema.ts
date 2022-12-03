import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema()
export class Bookmark {
  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop({
    isRequired: false,
  })
  description: string;

  @Prop({
    isRequired: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  _userid: ObjectId
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
