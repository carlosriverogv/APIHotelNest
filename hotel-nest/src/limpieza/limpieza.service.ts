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
    @InjectModel('habitaciones')
    private readonly habitacionModel: Model<Habitacion>,
  ) {}

  // Servicio de inserción de nuevas limpiezas
  async create(createLimpiezaDto: CreateLimpiezaDto) {
    try {
      // Buscar la habitación por su id
      const habitacion = await this.habitacionModel
        .findById(createLimpiezaDto.habitacion)
        .exec();
      // Si la habitación no existe, lanzar una excepción NotFoundException
      if (!habitacion) {
        throw new NotFoundException(
          `ID '${createLimpiezaDto.habitacion}' de habitación no encontrado`,
        );
      }

      // Crear una nueva limpieza
      const nuevaLimpieza = await this.limpiezaModel.create(createLimpiezaDto);

      // Buscar todas las limpiezas de una habitación por su id
      const limpiezas = await this.limpiezaModel
        .find({ habitacion: createLimpiezaDto.habitacion })
        .sort({ fecha: -1 })
        .exec();

      // Actualizar la fecha de la última limpieza de la habitación
      await this.habitacionModel.findByIdAndUpdate(
        createLimpiezaDto.habitacion,
        { ultimaLimpieza: limpiezas[0].fecha },
      );
      return nuevaLimpieza;
    } catch (error) {
      if (error.name == 'ValidationError') {
        throw new HttpException(
          {
            ok: false,
            error: 'Error: datos de limpieza no válidos',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          {
            ok: false,
            error: 'Error creando limpieza',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  /*
   *  En Mongoose, puedes encadenar métodos
   *  de consulta como .find(), .findOne(), .update(), etc., y luego llamar a .exec()
   *  para ejecutar la consulta y obtener una promesa que se resolverá con el resultado
   *  de la consulta.
   */
  async findAllByRoomId(id: string): Promise<Limpieza[]> {
    try {
      // Buscar todas las limpiezas de una habitación por su id
      const limpiezas = await this.limpiezaModel
        .find({ habitacion: id })
        .sort({ fecha: -1 })
        .exec();
      return limpiezas || [];
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          error: 'Error buscando limpiezas',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /*
   *  Para comprobar si una habitación está limpia, primero debe buscar la última
   *  limpieza registrada para esa habitación y luego verificar si la habitación
   *  está limpia o no. comparando la fecha actual con la última limpieza.
   */
  async isClean(id: string): Promise<{ ok: boolean }> {
    try {
      // Buscar la habitación por su id
      const habitacion = await this.habitacionModel.findById(id).exec();
      if (habitacion) {
        const ultimaLimpieza = habitacion.ultimaLimpieza;
        const fechaActual = new Date();

        // Formatear las fechas a 00:00:00 para compararlas
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

  // Actualiza una limpieza por su id
  async update(id: string, updateLimpiezaDto: UpdateLimpiezaDto) {
    try {
      // Buscar y actualizar la limpieza
      const resultado = this.limpiezaModel.findByIdAndUpdate(
        id,
        { $set: updateLimpiezaDto },
        { new: true },
      );

      // Si no se encuentra la limpieza, lanzar una excepción NotFoundException
      if (!resultado) {
        throw new NotFoundException('Limpieza no encontrada');
      }

      // Se obtiene la limpieza actualizada la cual contiene el ID de la habitación
      const limpieza = await this.limpiezaModel.findById(id).exec();

      // Actualizar la fecha de la última limpieza de la habitación
      const limpiezas = await this.limpiezaModel
        .find({ habitacion: limpieza.habitacion })
        .sort({ fecha: -1 })
        .exec();
      await this.habitacionModel.findByIdAndUpdate(limpieza.habitacion, {
        ultimaLimpieza: limpiezas[0].fecha,
      });
      return resultado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          {
            ok: false,
            error: 'Error actualizando limpieza',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  // Devulve un listado de las habitaciones que se han limpiado hoy, devolviendo
  // un array vacio en caso de no haber ninguna habitación limpia
  // Comprueba si la fecha de la última limpieza de la habitación está entre
  // la fecha actual formateando a 00:00:00 y la fecha actual real

  // Lo he hecho así a pesar de ya poder introducir la fecha de la limpieza sin horas con
  // el nuevo validador pata evitar confligtos con antiguas inserciones de limpiezas
  async findCleanToday(): Promise<Habitacion[]> {
    try {
      const fechaActualSinHoras = new Date();
      fechaActualSinHoras.setHours(0, 0, 0, 0);

      const habitaciones = await this.habitacionModel.find({
        ultimaLimpieza: {
          $gte: fechaActualSinHoras,
          $lte: Date.now(),
        },
      });

      return habitaciones || [];
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          error: 'Error buscando habitaciones',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
