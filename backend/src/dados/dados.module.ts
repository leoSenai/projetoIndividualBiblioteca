import { Module } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosController } from './dados.controller';

@Module({
  providers: [DadosService],
  controllers: [DadosController]
})
export class DadosModule {}
