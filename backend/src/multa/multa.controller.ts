import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MultaService } from './multa.service';
import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';

@Controller('multa')
export class MultaController {
  constructor(private readonly multaService: MultaService) {}

  @Post()
  create(@Body() dados:any) {
    const {dataDevolucao, ...others} = dados;
    let createMultaDto = new CreateMultaDto()
    createMultaDto = others;
    return this.multaService.create(createMultaDto, dataDevolucao);
  }

  @Get()
  findAll() {
    return this.multaService.findAll();
  }

  @Get('ativas')
  findAllAtivas(){
    return this.multaService.findAllAtivas();
  }

  @Get('inativas')
  findAllInativas(){
    return this.multaService.findAllInativas();
  }

  @Get('ativasList')
  ativasList(){
    return this.multaService.ativasList();
  }

  @Get('inativasList')
  inativasList(){
    return this.multaService.inativasList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multaService.findOne(+id);
  }

  @Get('/crianca/:idcrianca')
  findAllByIdCrianca(@Param('idcrianca') id: string) {
    return this.multaService.findAllByIdCrianca(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMultaDto: UpdateMultaDto) {
    return this.multaService.update(+id, updateMultaDto);
  }

  @Patch('quitar/:id')
  quitar(@Param('id') id: string){
    return this.multaService.quitar(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multaService.remove(+id);
  }
}
