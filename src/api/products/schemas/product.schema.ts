import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  sku: string;

  @Prop({ type: Number, required: true, min: 0 })
  quantity: number;

  @Prop({ type: String, required: true })
  salon: string;

  @Prop({ type: Boolean, required: true })
  needsRestocking: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
