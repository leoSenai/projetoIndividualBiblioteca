import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Emprestimo {
  @PrimaryGeneratedColumn()
  idcrianca: number;

  @PrimaryGeneratedColumn()
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