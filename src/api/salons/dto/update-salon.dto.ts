import { PartialType } from '@nestjs/mapped-types';
import { CreateSalonDto } from './create-salon.dto';

export class UpdateSalonDto extends PartialType(CreateSalonDto) {}
