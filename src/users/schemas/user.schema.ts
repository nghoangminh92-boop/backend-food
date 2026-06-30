import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  phone!: string;

  @Prop()
  avatar!: string;

  @Prop({ default: 'USER' })
  role!: string;

  @Prop({ default: new Date() })
  createdAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);