import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { User, UserDocument, UserType } from '../users/schemas/user.schema';
import { Salon, SalonDocument } from '../salons/schemas/salon.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Salon.name)
    private salonModel: Model<SalonDocument>,
  ) {}

  // Validates if the input data is correct
  private async validateAppointmentData(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<void> {
    const { clientId, masterId, salonId } = createAppointmentDto;

    // Check if clientId corresponds to a User with userType 'client'
    const client = await this.userModel.findOne({
      _id: clientId,
      userType: UserType.CLIENT,
    });

    if (!client) {
      throw new BadRequestException('Invalid clientId');
    }

    // Check if masterId corresponds to a User with userType 'master'
    const master = await this.userModel.findOne({
      _id: masterId,
      userType: UserType.MASTER,
    });

    if (!master) {
      throw new BadRequestException('Invalid masterId');
    }

    // Check if salonId corresponds to an existing Salon
    const salon = await this.salonModel.findById(salonId);

    if (!salon) {
      throw new BadRequestException('Invalid salonId');
    }
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
    user: UserDocument,
  ): Promise<Appointment> {
    createAppointmentDto.clientId = user._id.toString();
    await this.validateAppointmentData(createAppointmentDto);

    const createdAppointment =
      await this.appointmentModel.create(createAppointmentDto);
    return createdAppointment;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel
      .find()
      .populate('clientId')
      .populate('masterId')
      .populate('salonId')
      .exec();
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentModel
      .findByIdAndUpdate({ _id: id }, updateAppointmentDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Appointment> {
    const deletedAppointment = await this.appointmentModel
      .findByIdAndDelete({ _id: id })
      .exec();

    return deletedAppointment;
  }

  async getAllForClient(user: UserDocument): Promise<Appointment[]> {
    const userId = user._id;
    return this.appointmentModel
      .find({ clientId: userId })
      .populate('masterId')
      .populate('salonId')
      .exec();
  }

  async getAllForMaster(user: UserDocument): Promise<Appointment[]> {
    const userId = user._id;
    return this.appointmentModel
      .find({ masterId: userId })
      .populate('clientId')
      .populate('salonId')
      .exec();
  }
}
