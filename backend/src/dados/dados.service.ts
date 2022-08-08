import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DadosService {

    constructor(
        private connection: Connection
    ) { }

    async dadosResumos() {
        let query = this.connection.createQueryRunner();
        await query.connect();
        let multas = await query.query(`SELECT COUNT(*) as total, tipo FROM multa WHERE ativa='S' GROUP BY tipo;`);
        let emprestimos =  await query.query(`SELECT COUNT(*) as total FROM emprestimo WHERE ativo = 'S';`);
        let criancas = await query.query(`SELECT COUNT(*) as total FROM crianca`);
        let contadores = [criancas, emprestimos, multas]
        multas = await query.query(`select count(*) as total, month(data_inicio) as mes from multa group by month(data_inicio) order by mes asc;`)
        emprestimos = await query.query(`select count(*) as total, month(data_inicio) as mes from emprestimo group by month(data_inicio) order by mes asc;`);
        await query.release();
        return {
            "contadores": contadores,
            "porMes": [emprestimos, multas]
        }
    }
}
