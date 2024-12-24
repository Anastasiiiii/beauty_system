import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

import { CurrentUser } from '../auth/current-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @Get()
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('client')
  async getAllForClient(@CurrentUser() user: UserDocument) {
    return this.appointmentsService.getAllForClient(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
