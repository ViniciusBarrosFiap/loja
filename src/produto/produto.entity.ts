/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"produtos"})
export class ProdutoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({name:"usuario_id", length:100, nullable:false})
  usuarioId: string;
  @Column({name:"nome", length:100, nullable:false})
  nome: string;
  @Column({name:"valor", nullable:false})
  valor: number;
  @Column({name:"quantidade", nullable:false})
  quantidade: number;
  @Column({name:"descricao", length:255, nullable:false})
  descricao: string;
  @Column({name:"categoria", length:100, nullable:false})
  categoria: string;
  @CreateDateColumn({name:'created_at'})//Define colunas de quando foi criado
  createdAt: string;
  @UpdateDateColumn({name:'updated_at'})//Define colunas de quando foi atualizado
  updatedAt: string;
  @DeleteDateColumn({name:'deleted_at'})//Define colunas de quando foi deletado
  deletedAt: string;
  // caracteristicas: CaracteristicaProduto[];
  // imagens: ImagemProduto[];
}
