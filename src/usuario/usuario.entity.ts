/* eslint-disable prettier/prettier */
import { 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn } from "typeorm";

@Entity({name:'usuarios'})//Classificando como entidade e o nome
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({name:'nome', length: 100, nullable: false})//Define as colunas do db, tamanho e se pode ser vázio
  nome: string;
  @Column({name:'email', length: 70, nullable: false})
  email: string;
  @Column({name:'senha', length:255, nullable:false})
  senha: string;
  @CreateDateColumn({name:'created_at'})//Define colunas de quando foi criado
  createdAt: string;
  @UpdateDateColumn({name:'updated_at'})//Define colunas de quando foi atualizado
  updatedAt: string;
  @DeleteDateColumn({name:'deleted_at'})//Define colunas de quando foi deletado
  deletedAt: string;
}
