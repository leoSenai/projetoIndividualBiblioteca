import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Controller('emprestimo')
export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  @Post()
  create(@Body() createEmprestimoDto: CreateEmprestimoDto) {
    return this.emprestimoService.create(createEmprestimoDto);
  }

  @Get()
  findAll() {
    return this.emprestimoService.findAll();
  }

  @Get('basic')
  findALlSpecial(){
    return this.emprestimoService.findAllSpecial();
  }

  @Get(':idlivro/:idcrianca')
  findOne(@Param('idlivro') idlivro: string, @Param('idcrianca') idcrianca: string) {
    return this.emprestimoService.findOne(+idlivro,+idcrianca);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmprestimoDto: UpdateEmprestimoDto) {
    return this.emprestimoService.update(+id, updateEmprestimoDto);
  }

  @Patch('/renovar/:id')
  renew(@Body() dados: any) {
    return this.emprestimoService.renew(dados.idemprestimo, dados.idcrianca, dados.idlivro);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emprestimoService.remove(+id);
  }
}
