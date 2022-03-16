import { PartialType } from '@nestjs/mapped-types';
import { CreateCriancaDto } from './create-crianca.dto';

export class UpdateCriancaDto extends PartialType(CreateCriancaDto) {}
