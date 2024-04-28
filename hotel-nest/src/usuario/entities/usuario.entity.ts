import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 100,
  })
  login: string;

  @Prop({
    required: true,
    minlength: 4,
    maxlength: 100,
  })
  password: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
