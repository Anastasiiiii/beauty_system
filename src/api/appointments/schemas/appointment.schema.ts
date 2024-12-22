import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ type: String, required: true })
  serviceName: string;

  @Prop({ type: Date, required: true })
  appointmentTime: Date;

  @Prop({ type: String, required: true })
  clientId: string;

  @Prop({ type: String, required: true })
  salonId: string;

  @Prop({ type: String, required: true })
  masterId: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
