import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultaService } from 'src/multa/multa.service';
import { Connection, Repository } from 'typeorm';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { Emprestimo } from './entities/emprestimo.entity';

@Injectable()
export class EmprestimoService {

  constructor(
    @InjectRepository(Emprestimo) private emprestimoRepository: Repository<Emprestimo>,
    private multaService: MultaService,
    private connection: Connection
  ){}

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    let multas =  await this.multaService.countMultas(createEmprestimoDto.idcrianca);
    if(multas > 0 ){
      throw new HttpException("Há multas ativas para esta criança",400);
    }

    let emprestados = await this.emprestimoRepository.count({idcrianca:createEmprestimoDto.idcrianca,ativo:'S'});
    if(emprestados >= 2){
      throw new HttpException("Limite de emprestimos excedido",400);
    }

    let emprestimo = this.emprestimoRepository.create(createEmprestimoDto);
    return this.emprestimoRepository.save(emprestimo);
  }

  async renew(idemprestimo: number, idcrianca: number, idlivro: number){
    let multas =  await this.multaService.countMultas(idcrianca);
    if(multas > 0 ){
      throw new HttpException("Há multas ativas para esta criança",400);
    }

    let emprestados = await this.emprestimoRepository.count({idcrianca:idcrianca,ativo:'S'});
    if(emprestados >= 2){
      throw new HttpException("Limite de emprestimos excedido",400);
    }
    //select (count(e.idemprestimo) - l.numeroExemplares) from emprestimo e inner join livro l on l.idlivro = e.idlivro where e.idlivro =
    this.connection.createQueryRunner();
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
