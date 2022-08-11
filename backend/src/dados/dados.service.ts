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
        multas = await query.query(`select date(data_inicio) as dia from multa where data_inicio >  DATE_SUB(now(), INTERVAL 12 MONTH);`)
        emprestimos = await query.query(`select date(data_inicio) as dia from emprestimo where data_inicio >  DATE_SUB(now(), INTERVAL 12 MONTH);`);
        await query.release();

        let grafico = [
            {
                "name":"Janeiro",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Fevereiro",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Março",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Abril",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Maio",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Junho",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Julho",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Agosto",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Setembro",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Outubro",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Novembro",
                "multas":"",
                "emprestimos":""
            },
            {
                "name":"Dezembro",
                "multas":"",
                "emprestimos":""
            },
        ]

        return {
            "contadores": contadores,
            "porMes": [emprestimos, multas]
        }
    }
}
