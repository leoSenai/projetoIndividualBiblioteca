import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crianca {
  @PrimaryGeneratedColumn()
  idcrianca: number;

  @Column()
  cpf: string;

  @Column()
  senha: string;

  @Column()
  email_responsavel: string;
}