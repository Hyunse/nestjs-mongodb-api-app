import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bookmark extends Document {
  @Prop()
  title: String;

  @Prop()
  link: String;

  @Prop({
    isRequired: false,
  })
  description: String;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
