import { Module } from '@nestjs/common';
import { MultaService } from './multa.service';
import { MultaController } from './multa.controller';
import { Multa } from './entities/multa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Multa])],
  controllers: [MultaController],
  providers: [MultaService]
})
export class MultaModule {}
