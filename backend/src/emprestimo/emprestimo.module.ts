import { forwardRef, Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { MultaModule } from 'src/multa/multa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emprestimo]),
    forwardRef(() => MultaModule)
  ],
  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports: [EmprestimoService]
})
export class EmprestimoModule {}
