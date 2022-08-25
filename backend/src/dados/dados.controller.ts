import { Controller, Get, Param } from '@nestjs/common';
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

    @Get('report/:inicio/:fim')
    createReports(@Param('inicio') inicio:string, @Param('fim') fim:string){
        return this.dados.dadosRelatorio(inicio,fim);
    }
}
