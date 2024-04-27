// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';

@Controller('limpieza')
export class LimpiezaController {
  constructor(private readonly limpiezaService: LimpiezaService) {}

  @Post()
  create(@Body() createLimpiezaDto: CreateLimpiezaDto) {
    return this.limpiezaService.create(createLimpiezaDto);
  }

  // Buscar limpiezas por id de habitación
  @Get(':id')
  findAllByRoomId(@Param('id') id: string) {
    return this.limpiezaService.findAllByRoomId(id);
  }

  // Verificar si una habitación está limpia
  @Get('limpia/:id')
  isClean(@Param('id') id: string) {
    return this.limpiezaService.isClean(id);
  }

  @Get()
  findAll() {
    return this.limpiezaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.limpiezaService.findOne(+id);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  update(@Param('id') id: string, @Body() updateLimpiezaDto: UpdateLimpiezaDto) {
    return this.limpiezaService.update(+id, updateLimpiezaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.limpiezaService.remove(+id);
  }
}
