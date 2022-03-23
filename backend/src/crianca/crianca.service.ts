import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCriancaDto } from './dto/create-crianca.dto';
import { UpdateCriancaDto } from './dto/update-crianca.dto';
import { Crianca } from './entities/crianca.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CriancaService {

  constructor(
    @InjectRepository(Crianca) private criancaRepository: Repository<Crianca>
  ){}

  async create(createCriancaDto: CreateCriancaDto) {
    createCriancaDto.senha = await bcrypt.hash(createCriancaDto.senha, 10);
    const kid = this.criancaRepository.create(createCriancaDto);
    return this.criancaRepository.save(kid);
  }

  findAll() {
    return this.criancaRepository.find();
  }

  findOne(cpf: string) {
    return this.criancaRepository.findOne({cpf});
  }

  async update(id: number, updateCriancaDto: UpdateCriancaDto) {
    if(updateCriancaDto.senha != undefined){
      updateCriancaDto.senha = await bcrypt.hash(updateCriancaDto.senha,10);
    }
    return this.criancaRepository.update(id,updateCriancaDto);
  }

}
