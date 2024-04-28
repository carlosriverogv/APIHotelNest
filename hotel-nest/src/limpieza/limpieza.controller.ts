// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';

@Controller('limpieza')
@UsePipes(ValidationPipe)
export class LimpiezaController {
  constructor(private readonly limpiezaService: LimpiezaService) {}

  // Crear nueva limpieza
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

  // No se porque da error al llamar a limpias, no he conseguido solucionarlo
  @Get('limpias')
  findCleanToday() {
    return this.limpiezaService.findCleanToday();
  }

  // Actualizar limpieza
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLimpiezaDto: UpdateLimpiezaDto,
  ) {
    return this.limpiezaService.update(id, updateLimpiezaDto);
  }
}
