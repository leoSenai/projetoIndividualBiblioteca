import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Emprestimo {
  @PrimaryGeneratedColumn()
  idemprestimo: number;

  @Column()
  idcrianca: number;

  @Column()
  idlivro: number;

  @Column()
  data_inicio: string;

  @Column()
  data_devolucao: string;

  @Column()
  renovacao: number;

  @Column()
  estado_livro: string;
}