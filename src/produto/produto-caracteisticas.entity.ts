/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/* eslint-disable prettier/prettier */
@Entity({name:"produto_caracteristica"})
export class ProdutoCaracteristicas {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({name:"nome", length:"100", nullable:false})
    nome: string;
    @Column({name:"descricao", length:255, nullable:false})
    descricao: string;
  }