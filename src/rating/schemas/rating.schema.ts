import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Rating {
  @Prop({ required: true })
  postId!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true, min: 1, max: 5 })
  star!: number;

  @Prop({ default: new Date() })
  createdAt!: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);