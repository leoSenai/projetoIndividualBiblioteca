import { Injectable } from '@nestjs/common';
import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';

@Injectable()
export class MultaService {
  create(createMultaDto: CreateMultaDto) {
    return 'This action adds a new multa';
  }

  findAll() {
    return `This action returns all multa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multa`;
  }

  update(id: number, updateMultaDto: UpdateMultaDto) {
    return `This action updates a #${id} multa`;
  }

  remove(id: number) {
    return `This action removes a #${id} multa`;
  }
}
