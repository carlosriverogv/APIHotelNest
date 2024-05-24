// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('limpieza')
@UsePipes(ValidationPipe)
export class LimpiezaController {
  constructor(private readonly limpiezaService: LimpiezaService) {}

  // Crear nueva limpieza
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLimpiezaDto: CreateLimpiezaDto) {
    return this.limpiezaService.create(createLimpiezaDto);
  }

  // Buscar las habitaciones limpiadas hoy
  @Get('limpias')
  findCleanToday() {
    return this.limpiezaService.findCleanToday();
  }

  // Buscar las habitaciones sucias
  @Get('sucias')
  findDirtyRooms() {
    return this.limpiezaService.findDirtyRooms();
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

  // Actualizar limpieza
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLimpiezaDto: UpdateLimpiezaDto,
  ) {
    return this.limpiezaService.update(id, updateLimpiezaDto);
  }
}
