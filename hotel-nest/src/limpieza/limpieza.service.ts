import { Injectable } from '@nestjs/common';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';
import { Limpieza } from './entities/limpieza.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LimpiezaService {
  constructor(
    @InjectModel('limpiezas')
    private readonly limpiezaModel: Model<Limpieza>,
  ) {}

  async create(createLimpiezaDto: CreateLimpiezaDto) {
    const nuevaLimpieza = await this.limpiezaModel.create(createLimpiezaDto);
    return nuevaLimpieza;
  }

  findAll() {
    return `This action returns all limpieza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} limpieza`;
  }

  /*
   *  Cuando trabajas con consultas asíncronas en Mongoose, puedes encadenar métodos
   *  de consulta como .find(), .findOne(), .update(), etc., y luego llamar a .exec()
   *  para ejecutar la consulta y obtener una promesa que se resolverá con el resultado
   *  de la consulta.
   */
  async findAllByRoomId(id: string): Promise<Limpieza[]> {
    const limpiezas = await this.limpiezaModel
      .find({ habitacionId: id })
      .sort({ fecha: -1 })
      .exec();
    return limpiezas || [];
  }

  update(id: number, updateLimpiezaDto: UpdateLimpiezaDto) {
    return `This action updates a #${id} limpieza`;
  }

  remove(id: number) {
    return `This action removes a #${id} limpieza`;
  }
}
