import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Multa {
  @PrimaryGeneratedColumn()
  idmulta: number;

  @Column()
  valor: string;
  
  @Column()
  tipo: string;
  
  @Column()
  data_inicio: string;
  
  @Column()
  data_quitacao:string;
  
  @Column()
  ativa:string;
  
  @Column()
  motivo:string;
  
  @Column()
  idcrianca:number;  
}