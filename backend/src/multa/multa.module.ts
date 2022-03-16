import { Module } from '@nestjs/common';
import { MultaService } from './multa.service';
import { MultaController } from './multa.controller';

@Module({
  controllers: [MultaController],
  providers: [MultaService]
})
export class MultaModule {}
