import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop()
  image!: string;

  @Prop({ required: true })
  author!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop()
  avatar!: string;

  @Prop({ default: new Date() })
  createdAt!: Date;

  @Prop({ default: new Date() })
  updatedAt!: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);