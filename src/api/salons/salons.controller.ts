import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalonsService } from './salons.service';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';
import { Salon } from './schemas/salon.schema';

@Controller('api/salons')
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

  @Post()
  async create(@Body() createSalonDto: CreateSalonDto): Promise<Salon> {
    return this.salonsService.create(createSalonDto);
  }

  @Get()
  async findAll(): Promise<Salon[]> {
    return this.salonsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Salon> {
    return this.salonsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdateSalonDto,
  ): Promise<Salon> {
    return this.salonsService.update(id, updateSalonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Salon> {
    return this.salonsService.remove(id);
  }
}
