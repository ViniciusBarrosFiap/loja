/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/* eslint-disable prettier/prettier */
@Entity({name:"produto_imagens"})
export class ProdutoImagem{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:"url", length:100, nullable:false})
    url: string;
    
    @Column({name:"desricao", length:100, nullable:false})
    descricao: string;
  }