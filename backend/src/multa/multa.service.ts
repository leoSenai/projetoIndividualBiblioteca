import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmprestimoService } from 'src/emprestimo/emprestimo.service';
import { Connection, Repository } from 'typeorm';
import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';
import { Multa } from './entities/multa.entity';

@Injectable()
export class MultaService {

  constructor(
    @InjectRepository(Multa) private multaRepository: Repository<Multa>, 
    @Inject(forwardRef(() => EmprestimoService))
    private connection : Connection,
    private emprestimoService: EmprestimoService
  ) { }

  dateDiff(d2: string) {
    const date1 = new Date().valueOf();
    const date2 = new Date(d2).valueOf();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  onlyDate(fullDate:string){
    let only = fullDate.split('T');
    return only[0]
  }

  async create(createMultaDto: CreateMultaDto, devPrevista: string) {
    //tipo A - atraso
    //tipo R - rasura
    //tipo D - destruição
    console.log(createMultaDto, devPrevista);
    let hoje = new Date();
    let quitar = new Date();
    switch (createMultaDto.tipo) {
      case "A":
        quitar.setDate(hoje.getDate() + (this.dateDiff(devPrevista) * 2 -1) );
        break;
      case "R":
        let multasRazura = await this.multaRepository.count({idcrianca:createMultaDto.idcrianca, tipo:'R'});
        if(multasRazura > 0){
          quitar.setDate(hoje.getDate() + 30*2**multasRazura);
        }else{
          quitar.setDate(hoje.getDate() + 30);
        }
        break;
      case "D":
        quitar.setDate(hoje.getDate() + 365);
    }
    console.log(quitar.toISOString())
    createMultaDto.data_inicio = this.onlyDate(hoje.toISOString());
    createMultaDto.data_quitacao = this.onlyDate(quitar.toISOString());
    let multa = this.multaRepository.create(createMultaDto);
    return this.multaRepository.save(multa);
  }

  findAll() {
    return this.multaRepository.find();
  }

  findOne(id: number) {
    return this.multaRepository.findOne(id);
  } 

  findAllByIdCrianca(id: number) {
    return this.multaRepository.find({idcrianca:id});
  }

  countMultas(idcrianca: number) {
    return this.multaRepository.count({ idcrianca: idcrianca, ativa: 'S' });
  }

  update(id: number, updateMultaDto: UpdateMultaDto) {
    return this.multaRepository.update(id, updateMultaDto);
  }

  quitar(id: number){
    return this.update(id, {ativa:'N'})
  }

  remove(id: number) {
    return this.multaRepository.delete(id);
  }
}
