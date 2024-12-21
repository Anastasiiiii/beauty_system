import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SalonDocument = HydratedDocument<Salon>;

@Schema()
export class Salon {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: [String], default: [] })
  masters: string[];
}

export const SalonSchema = SchemaFactory.createForClass(Salon);
