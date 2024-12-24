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
import { SalonsService } from 'src/api/salons/salons.service';
import { CreateSalonDto } from 'src/api/salons/dto/create-salon.dto';
import { UpdateSalonDto } from 'src/api/salons/dto/update-salon.dto';
import { Salon } from 'src/api/salons/schemas/salon.schema';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';

@Controller('api/salons')
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch('master/:id')
  async assignMaster(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdateSalonDto,
  ): Promise<Salon> {
    const { masterId } = updateSalonDto;
    return this.salonsService.assignMaster(id, masterId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdateSalonDto,
  ): Promise<Salon> {
    return this.salonsService.update(id, updateSalonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Salon> {
    return this.salonsService.remove(id);
  }
}
