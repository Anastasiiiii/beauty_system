import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { ReportDocument } from './schemas/report.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReportDto: CreateReportDto,
    @CurrentUser() user: UserDocument,
  ): Promise<ReportDocument> {
    return this.reportsService.create(createReportDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ReportDocument[]> {
    return this.reportsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReportDocument> {
    return this.reportsService.remove(id);
  }
}