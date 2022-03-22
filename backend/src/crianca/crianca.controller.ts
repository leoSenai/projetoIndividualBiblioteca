import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CriancaService } from './crianca.service';
import { CreateCriancaDto } from './dto/create-crianca.dto';
import { UpdateCriancaDto } from './dto/update-crianca.dto';

@Controller('crianca')
export class CriancaController {
  constructor(private readonly criancaService: CriancaService) {}

  @Post()
  create(@Body() createCriancaDto: CreateCriancaDto) {
    return this.criancaService.create(createCriancaDto);
  }

  @Get()
  findAll() {
    return this.criancaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criancaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCriancaDto: UpdateCriancaDto) {
    return this.criancaService.update(+id, updateCriancaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criancaService.remove(+id);
  }
}
