import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idusuario: number;

  @Column()
  nome:string;
  
  @Column()
  matricula:number;
  
  @Column()
  senha:string;
  
  @Column()
  administrador:string;
}