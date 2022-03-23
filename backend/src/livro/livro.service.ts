import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from './entities/livro.entity';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro) private livroRepository: Repository<Livro>
  ){}

  create(createLivroDto: CreateLivroDto) {
    const livro = this.livroRepository.create(createLivroDto);
    return this.livroRepository.save(livro);
  }

  findAll() {
    return this.livroRepository.find();
  }

  findOne(id: number) {
    return this.livroRepository.findOne(id);
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    return this.livroRepository.update(id, updateLivroDto);
  }
}
