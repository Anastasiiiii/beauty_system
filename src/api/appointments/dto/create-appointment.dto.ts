export class CreateAppointmentDto {
  readonly serviceName: string;
  readonly appointmentTime: Date;
  clientId: string;
  readonly salonId: string;
  readonly masterId: string;
}
