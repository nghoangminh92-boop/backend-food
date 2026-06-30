import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Comment {
  @Prop({ required: true })
  postId!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  user!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop()
  avatar!: string;

  @Prop({ default: new Date() })
  createdAt!: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);