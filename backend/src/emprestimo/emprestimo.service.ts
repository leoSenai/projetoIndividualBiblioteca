import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { Emprestimo } from './entities/emprestimo.entity';

@Injectable()
export class EmprestimoService {

  constructor(
    @InjectRepository(Emprestimo) private emprestimoRepository: Repository<Emprestimo>
  ){}

  create(createEmprestimoDto: CreateEmprestimoDto) {
    let emprestimo = this.emprestimoRepository.create(createEmprestimoDto);
    return this.emprestimoRepository.save(emprestimo);
  }

  findAll() {
    return this.emprestimoRepository.find();
  }

  findOne(idlivro: number, idcrianca: number) {
    return this.emprestimoRepository.findOne({idlivro: idlivro, idcrianca: idcrianca});
  }

  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return this.emprestimoRepository.update(id, updateEmprestimoDto);
  }

  remove(id: number) {
    return this.emprestimoRepository.delete(id);
  }
}
