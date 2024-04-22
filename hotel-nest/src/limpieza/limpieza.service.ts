import { Injectable } from '@nestjs/common';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';

@Injectable()
export class LimpiezaService {
  create(createLimpiezaDto: CreateLimpiezaDto) {
    return 'This action adds a new limpieza';
  }

  findAll() {
    return `This action returns all limpieza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} limpieza`;
  }

  update(id: number, updateLimpiezaDto: UpdateLimpiezaDto) {
    return `This action updates a #${id} limpieza`;
  }

  remove(id: number) {
    return `This action removes a #${id} limpieza`;
  }
}
