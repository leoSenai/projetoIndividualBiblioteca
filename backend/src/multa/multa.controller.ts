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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multaService.findOne(+id);
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
