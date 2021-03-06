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
    private emprestimoService: EmprestimoService,
    private connection : Connection,
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
    createMultaDto.data_inicio = this.onlyDate(hoje.toISOString());
    createMultaDto.data_quitacao = this.onlyDate(quitar.toISOString());
    let multa = this.multaRepository.create(createMultaDto);
    return this.multaRepository.save(multa);
  }

  async createLate(idCrianca: number, devPrevista:string){
    let multa = new CreateMultaDto;
    multa.ativa = 'S';
    multa.idcrianca = idCrianca;
    multa.motivo = "Atraso de devolução"
    multa.tipo = "A";
    multa.valor = "0";
    return this.create(multa, devPrevista);
  }

  async createErasure(idCrianca: number){
    let multa = new CreateMultaDto;
    multa.ativa = 'S';
    multa.idcrianca = idCrianca;
    multa.motivo = "Rasura de Livro"
    multa.tipo = "R";
    multa.valor = "0";
    return this.create(multa, "auto");
  }

  async createDestruction(idCrianca: number, valor: string){
    let multa = new CreateMultaDto;
    multa.ativa = 'S';
    multa.idcrianca = idCrianca;
    multa.motivo = "Destruição ou Extravio de Livro"
    multa.tipo = "D";
    multa.valor = valor;
    return this.create(multa, "auto");
  }

  findAll() {
    return this.multaRepository.find();
  }

  findAllAtivas(){
    return this.multaRepository.find({ativa:'S'})
  }

  findAllInativas(){
    return this.multaRepository.find({ativa:'N'})
  }

  async ativasList() {

    let query = this.connection.createQueryRunner();
    await query.connect();
    let disponivel = await query.query(`SELECT c.cpf, m.* FROM multa m INNER JOIN crianca c ON m.idcrianca=c.idcrianca WHERE m.ativa='S';`);
    await query.release();
    return disponivel;
  }

  async inativasList() {
    let query = this.connection.createQueryRunner();
    await query.connect();
    let disponivel = await query.query(`SELECT c.cpf, m.* FROM multa m INNER JOIN crianca c ON m.idcrianca=c.idcrianca WHERE m.ativa='N';`);
    await query.release();
    return disponivel;
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

  async verificarTempo(){
    let query = this.connection.createQueryRunner();
    await query.connect();
    let disponivel = await query.query(`SELECT * FROM multa WHERE current_date() > data_quitacao AND ativa = 'S';`);
    await query.release();
    return disponivel;
  }

  remove(id: number) {
    return this.multaRepository.delete(id);
  }
}
