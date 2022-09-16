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
        let emprestimos = await query.query(`SELECT COUNT(*) as total FROM emprestimo WHERE ativo = 'S';`);
        let criancas = await query.query(`SELECT COUNT(*) as total FROM crianca`);
        let contadores = [criancas, emprestimos, multas]
        multas = await query.query(`select date(data_inicio) as dia from multa where data_inicio >  DATE_SUB(now(), INTERVAL 12 MONTH);`)
        emprestimos = await query.query(`select date(data_inicio) as dia from emprestimo where data_inicio >  DATE_SUB(now(), INTERVAL 12 MONTH);`);
        await query.release();

        let grafico = [
            {
                "name": "Janeiro",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Fevereiro",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Março",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Abril",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Maio",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Junho",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Julho",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Agosto",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Setembro",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Outubro",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Novembro",
                "multas": 0,
                "emprestimos": 0
            },
            {
                "name": "Dezembro",
                "multas": 0,
                "emprestimos": 0
            },
        ]
        for (let i = 0; i < emprestimos.length; i++) {
            let dataEvento = new Date(emprestimos[i].dia);
            let index = dataEvento.getMonth()
            grafico[index].emprestimos++;
        }
        for (let i = 0; i < multas.length; i++) {
            let dataEvento = new Date(multas[i].dia);
            let index = dataEvento.getMonth()
            grafico[index].multas++;
        }
        return {
            "contadores": contadores,
            "porMes": grafico,
        }
    }

    async dadosRelatorio(inicio: string, fim: string){
        let query = this.connection.createQueryRunner();
        fim = fim.split('T')[0];
        inicio = inicio.split('T')[0];
        await query.connect();
        console.log(inicio)
        let emprestimos = await query.query(`SELECT e.data_inicio, c.cpf, l.titulo FROM emprestimo e INNER JOIN crianca c ON e.idcrianca=c.idcrianca INNER JOIN livro l ON l.idlivro=e.idlivro WHERE e.data_inicio >= '${inicio}' AND e.data_inicio <= '${fim}' ORDER BY e.data_inicio DESC`);
        let multas= await query.query(`SELECT m.data_inicio, c.cpf, m.motivo FROM multa m INNER JOIN crianca c ON m.idcrianca=c.idcrianca WHERE m.data_inicio >= '${inicio}' AND m.data_inicio <= '${fim}' ORDER BY m.data_inicio DESC`);
        await query.release();
        return [emprestimos, multas];
    }

}
