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

  onlyDate(fullDate:string){
    let only = fullDate.split('T');
    return only[0]
  }

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    let multas =  await this.multaService.countMultas(createEmprestimoDto.idcrianca);
    if(multas > 0 ){
      throw new HttpException("Há multas ativas para esta criança",400);
    }

    let emprestados = await this.emprestimoRepository.count({idcrianca:createEmprestimoDto.idcrianca,ativo:'S'});
    if(emprestados >= 2){
      throw new HttpException("Limite de emprestimos excedido",400);
    }


    let query = this.connection.createQueryRunner();
    await query.connect();
    let disponivel = await query.query(`select (l.numeroExemplares - count(e.idemprestimo)) as disponiveis from emprestimo e inner join livro l on l.idlivro = e.idlivro where e.idlivro = ${createEmprestimoDto.idlivro}`);
    query.release();
    
    if(disponivel <= 0){
      throw new HttpException("Sem exemplares disponíveis",400);
    }

    let hoje = new Date();
    let devolver = new Date();
    devolver.setDate(hoje.getDate() + 8);

    createEmprestimoDto.data_inicio = this.onlyDate(hoje.toISOString())
    createEmprestimoDto.data_devolucao = this.onlyDate(devolver.toISOString())

    let emprestimo = this.emprestimoRepository.create(createEmprestimoDto);
    return this.emprestimoRepository.save(emprestimo);
  }

  async renew(idemprestimo: number, idcrianca: number, idlivro: number){
    
    console.log(idemprestimo);

    let multas =  await this.multaService.countMultas(idcrianca);
    
    if(multas > 0 ){
      throw new HttpException("Há multas ativas para esta criança",400);
    }

    let emprestados = await this.emprestimoRepository.count({idcrianca:idcrianca,ativo:'S'});
    if(emprestados >= 2){
      throw new HttpException("Limite de emprestimos excedido",400);
    }
    
    let query = this.connection.createQueryRunner();
    await query.connect();
    
    let disponivel = await query.query(`select (l.numeroExemplares - count(e.idemprestimo)) as disponiveis from emprestimo e inner join livro l on l.idlivro = e.idlivro where e.idlivro = ${idlivro}`);
    
    await query.release();
    
    if(disponivel <= 1){
      throw new HttpException("Sem exemplares disponíveis",400);
    }

    let emprestimo = await this.emprestimoRepository.findOne({idemprestimo:idemprestimo});
    emprestimo.renovacao++
    let novaDevolucao = new Date(emprestimo.data_devolucao);
    novaDevolucao.setDate(novaDevolucao.getDate() + 8);

    return this.emprestimoRepository.update(idemprestimo, emprestimo);
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
