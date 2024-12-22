import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserType {
  CLIENT = 'client',
  MASTER = 'master',
  ADMINISTRATOR = 'administrator',
}

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  refreshToken: string;

  @Prop({ type: String, enum: UserType, required: true })
  userType: UserType;

  @Prop({ type: [String], default: [] })
  reviews: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
