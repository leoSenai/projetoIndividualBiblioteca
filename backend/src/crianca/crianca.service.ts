import { Injectable } from '@nestjs/common';
import { CreateCriancaDto } from './dto/create-crianca.dto';
import { UpdateCriancaDto } from './dto/update-crianca.dto';

@Injectable()
export class CriancaService {
  create(createCriancaDto: CreateCriancaDto) {
    return 'This action adds a new crianca';
  }

  findAll() {
    return `This action returns all crianca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crianca`;
  }

  update(id: number, updateCriancaDto: UpdateCriancaDto) {
    return `This action updates a #${id} crianca`;
  }

  remove(id: number) {
    return `This action removes a #${id} crianca`;
  }
}
