import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])],
  controllers: [LivroController],
  providers: [LivroService]
})
export class LivroModule {}
