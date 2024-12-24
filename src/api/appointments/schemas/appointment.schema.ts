import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { User } from 'src/api/users/schemas/user.schema';
import { Salon } from 'src/api/salons/schemas/salon.schema';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ type: String, required: true })
  serviceName: string;

  @Prop({ type: Date, required: true })
  appointmentTime: Date;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: User.name, required: true })
  clientId: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: Salon.name, required: true })
  salonId: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: User.name, required: true })
  masterId: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
