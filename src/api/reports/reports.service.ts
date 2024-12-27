import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { Report, ReportDocument } from './schemas/report.schema';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    user: UserDocument,
  ): Promise<ReportDocument> {
    const userId = user._id;
    const { text } = createReportDto;
    return this.reportModel.create({ userId, text });
  }

  async findAll(): Promise<ReportDocument[]> {
    return this.reportModel.find().populate('userId').exec();
  }

  async remove(id: string): Promise<ReportDocument> {
    return this.reportModel.findByIdAndDelete({ _id: id }).exec();
  }
}