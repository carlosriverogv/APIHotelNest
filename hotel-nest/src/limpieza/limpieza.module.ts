import { Module } from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { LimpiezaController } from './limpieza.controller';

@Module({
  controllers: [LimpiezaController],
  providers: [LimpiezaService],
})
export class LimpiezaModule {}
