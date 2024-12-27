import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { SalonsModule } from './salons/salons.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

export default [
  AppointmentsModule,
  AuthModule,
  ReportsModule,
  ProductsModule,
  SalonsModule,
  UsersModule,
];
