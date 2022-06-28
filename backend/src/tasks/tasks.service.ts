import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MultaService } from 'src/multa/multa.service';

@Injectable()
export class TasksService {

    constructor(
        private multaService:MultaService
    ){}

    @Cron('*/30 * * * * *')
    async verifyFine(){
        let multasVencidas = await this.multaService.verificarTempo();
        for (let i = 0; i < multasVencidas.length; i++) {
            this.multaService.quitar(multasVencidas[i].idmulta)
        }
    }
}

