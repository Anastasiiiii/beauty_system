import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salon, SalonSchema } from './schemas/salon.schema';
import { SalonsService } from './salons.service';
import { SalonsController } from './salons.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Salon.name, schema: SalonSchema }]),
  ],
  controllers: [SalonsController],
  providers: [SalonsService],
})
export class SalonsModule {}
