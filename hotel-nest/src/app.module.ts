import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LimpiezaModule } from './limpieza/limpieza.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/hotel'), LimpiezaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
