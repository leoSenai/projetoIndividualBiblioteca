import { forwardRef, Module } from '@nestjs/common';
import { MultaService } from './multa.service';
import { MultaController } from './multa.controller';
import { Multa } from './entities/multa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprestimoModule } from 'src/emprestimo/emprestimo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Multa]),
    forwardRef(() => EmprestimoModule),
  ],
  controllers: [MultaController],
  providers: [MultaService],
  exports: [MultaService]
})
export class MultaModule {}
