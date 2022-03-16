import { Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';

@Module({
  controllers: [EmprestimoController],
  providers: [EmprestimoService]
})
export class EmprestimoModule {}
