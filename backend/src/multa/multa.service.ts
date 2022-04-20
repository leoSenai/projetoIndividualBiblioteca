import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';
import { Multa } from './entities/multa.entity';

@Injectable()
export class MultaService {

  constructor(
    @InjectRepository(Multa) private multaRepository: Repository<Multa>
  ){}

  create(createMultaDto: CreateMultaDto) {
    let multa = this.multaRepository.create(createMultaDto);
    return this.multaRepository.save(multa);
  }

  findAll() {
    return this.multaRepository.find();
  }

  findOne(id: number) {
    return this.multaRepository.findOne(id);
  }

  countMultas(idcrianca:number){
    return this.multaRepository.count({idcrianca:idcrianca, ativa:'S'});
  }

  update(id: number, updateMultaDto: UpdateMultaDto) {
    return this.multaRepository.update(id, updateMultaDto);
  }

  remove(id: number) {
    return this.multaRepository.delete(id);
  }
}
