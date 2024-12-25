import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './schemas/salon.schema';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';

@Injectable()
export class SalonsService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
  ) {}

  async create(createSalonDto: CreateSalonDto): Promise<Salon> {
    const createdSalon = await this.salonModel.create(createSalonDto);
    return createdSalon;
  }

  async findAll(): Promise<Salon[]> {
    return this.salonModel.find().populate('masters').exec();
  }

  async findOne(id: string): Promise<Salon> {
    return this.salonModel.findOne({ _id: id }).populate('masters').exec();
  }

  async update(id: string, updateSalonDto: UpdateSalonDto): Promise<Salon> {
    return this.salonModel
      .findByIdAndUpdate({ _id: id }, updateSalonDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Salon> {
    const deletedSalon = await this.salonModel
      .findByIdAndDelete({ _id: id })
      .exec();

    return deletedSalon;
  }

  async assignMaster(id: string, masterId: string): Promise<Salon> {
    return this.salonModel
      .findByIdAndUpdate(
        { _id: id },
        { $push: { masters: masterId } },
        { new: true },
      )
      .exec();
  }
}
