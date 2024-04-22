import { PartialType } from '@nestjs/mapped-types';
import { CreateLimpiezaDto } from './create-limpieza.dto';

export class UpdateLimpiezaDto extends PartialType(CreateLimpiezaDto) {}
