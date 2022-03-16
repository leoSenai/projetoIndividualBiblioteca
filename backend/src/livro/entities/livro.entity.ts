import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  idlivro: number;

  @Column()
  ISBN: string;

  @Column()
  titulo:string;

  @Column()
  numeroExemplares:number;
  
  @Column()
  editora:string;
  
  @Column()
  tema:string;
  
  @Column()
  categoria:string;
}