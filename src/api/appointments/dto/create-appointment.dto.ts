export class CreateAppointmentDto {
  readonly serviceName: string;
  readonly appointmentTime: Date;
  readonly salonId: string;
  readonly masterId: string;
}
