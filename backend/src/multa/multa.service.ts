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

  create(createMultaDto: CreateMultaDto, devPrevista: string) {
    //tipo A - atraso
    //tipo R - rasura
    //tipo D - destruição

    let hoje = new Date();
    let quitar = new Date();
    switch (createMultaDto.tipo){
      case "A":
        quitar.setDate(hoje.getDate() + 8);
        break;
      case "R":
        //rodar query para multiplicações
        quitar.setDate(hoje.getDate() + 8);
        break;
      case "D":
        quitar.setDate(hoje.getDate() + 365);
    }

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
