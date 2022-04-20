import { Module } from '@nestjs/common';
import { CriancaService } from './crianca.service';
import { CriancaController } from './crianca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crianca } from './entities/crianca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crianca])],
  controllers: [CriancaController],
  providers: [CriancaService],
  exports: [CriancaService]
})
export class CriancaModule {}
