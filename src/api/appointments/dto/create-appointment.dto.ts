export class CreateAppointmentDto {
  readonly serviceName: string;
  readonly appointmentTime: Date;
  readonly clientId: string;
  readonly salonId: string;
  readonly masterId: string;
}
