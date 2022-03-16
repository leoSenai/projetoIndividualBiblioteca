import { Module } from '@nestjs/common';
import { CriancaService } from './crianca.service';
import { CriancaController } from './crianca.controller';

@Module({
  controllers: [CriancaController],
  providers: [CriancaService]
})
export class CriancaModule {}
