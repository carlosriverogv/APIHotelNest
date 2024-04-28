import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateLimpiezaDto {
  @IsMongoId({ message: 'El id de la habitación no es válido' })
  @IsNotEmpty({ message: 'El id de la habitación es requerido' })
  readonly habitacion: mongoose.Schema.Types.ObjectId;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha es requerida' })
  readonly fecha: Date;

  @IsString({ message: 'Las observaciones deben ser un texto' })
  readonly observaciones: string;
}
