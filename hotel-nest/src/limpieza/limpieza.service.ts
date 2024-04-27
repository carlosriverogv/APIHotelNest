import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';
import { Limpieza } from './entities/limpieza.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Injectable()
export class LimpiezaService {
  constructor(
    @InjectModel('limpiezas')
    private readonly limpiezaModel: Model<Limpieza>,
    private readonly habitacionModel: Model<Habitacion>,
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

  /*
   *  Para comprobar si una habitación está limpia, primero debe buscar la última
   *  limpieza registrada para esa habitación y luego verificar si la habitación
   *  está limpia o no. comparando la fecha actual con la última limpieza.
   */
  async isClean(id: string): Promise<{ ok: boolean }> {
    try {
      const habitacion = await this.habitacionModel.findById(id).exec();
      if (habitacion) {
        const ultimaLimpieza = habitacion.ultimaLimpieza;
        const fechaActual = new Date();

        fechaActual.setHours(0, 0, 0, 0);
        ultimaLimpieza.setHours(0, 0, 0, 0);

        // Si las fechas no coninciden significa que la habitación no está limpia
        // devuelve un JSON con un campo ok a true o false
        return { ok: fechaActual.getTime() === ultimaLimpieza.getTime() };
      } else {
        throw new NotFoundException(`ID '${id}' de habitación no encontrado`);
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          error: 'Error buscando habitación',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updateLimpiezaDto: UpdateLimpiezaDto) {
    return `This action updates a #${id} limpieza`;
  }

  remove(id: number) {
    return `This action removes a #${id} limpieza`;
  }
}
