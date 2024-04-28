import { PartialType } from '@nestjs/mapped-types';
import { CreateLimpiezaDto } from './create-limpieza.dto';
import { IsDateString, IsString } from 'class-validator';

export class UpdateLimpiezaDto extends PartialType(CreateLimpiezaDto) {
  @IsString({ message: 'Las observaciones deben ser texto' })
  readonly observaciones: string;

  @IsDateString()
  readonly fecha: Date;
}
