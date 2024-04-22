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

  @Get()
  findAll() {
    return this.limpiezaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.limpiezaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLimpiezaDto: UpdateLimpiezaDto) {
    return this.limpiezaService.update(+id, updateLimpiezaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.limpiezaService.remove(+id);
  }
}
