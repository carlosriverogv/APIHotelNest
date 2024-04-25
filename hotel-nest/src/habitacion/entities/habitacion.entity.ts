import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Habitacion extends Document {
  @Prop({
    required: true,
    max: 50,
    min: 1,
  })
  numero: number;

  @Prop({
    required: true,
    enum: ['individual', 'doble', 'familiar', 'suite'],
  })
  tipo: string;

  @Prop({
    required: true,
  })
  descrpcion: string;

  @Prop({
    required: true,
    default: Date.now,
  })
  ultimaLimpieza: Date;

  @Prop({
    required: true,
    min: 0,
    max: 300,
  })
  precio: number;

  @Prop({
    required: true,
  })
  imagen: string;
}

export const HabitacionSchema = SchemaFactory.createForClass(Habitacion);
