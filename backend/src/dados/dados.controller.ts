import { Controller, Get } from '@nestjs/common';
import { DadosService } from './dados.service';

@Controller('dados')
export class DadosController {
    constructor(
        private readonly dados: DadosService
    ) {}
    
    @Get()
    getInfo(){
        return this.dados.dadosResumos();
    }
}
