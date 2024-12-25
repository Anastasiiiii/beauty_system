import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { User } from 'src/api/users/schemas/user.schema';

export type SalonDocument = HydratedDocument<Salon>;

@Schema()
export class Salon {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop([{ type: MongoSchema.Types.ObjectId, ref: User.name, required: true }])
  masters: string[];
}

export const SalonSchema = SchemaFactory.createForClass(Salon);
