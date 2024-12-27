import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { User } from 'src/api/users/schemas/user.schema';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
  @Prop({ type: MongoSchema.Types.ObjectId, ref: User.name, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  text: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);