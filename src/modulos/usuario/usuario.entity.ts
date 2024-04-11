//Importações necessárias para definir a entidade de usuário
import { PedidoEntity } from '../pedido/pedido.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

//Arquivo dedidado a definir a entidade com as caracteristicas do usuário

@Entity({ name: 'usuarios' }) //Classificando a classe como uma entidade
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid') //Indicando qual é a coluna que irá conter a chave primária (uuid)
  id: string;
  @Column({ name: 'nome', length: 100, nullable: false }) //Define as colunas no db, tamanho e se pode ser vázio
  nome: string;
  @Column({ name: 'email', length: 70, nullable: false }) //Define coluna de email
  email: string;
  @Exclude() //Evita que o campo senha seja levado para o front end
  @Column({ name: 'senha', length: 255, nullable: false }) //Define coluna de email
  senha: string;
  @CreateDateColumn({ name: 'created_at' }) //Define colunas de quando foi criado
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' }) //Define colunas de quando foi atualizado
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' }) //Define colunas de quando foi deletado
  deletedAt: string;
  //Dizendo que um usuário pode estar associado a varios pedidoEntity mas que um pedido é associado a apenas um usuário
  //Parâmetros: 1-Entidade destido 2-Dizendo que cada pedido pertence apenas um usuário especifico
  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario) //Definindo o tipo de relacionamento no banco de dados
  pedidos: PedidoEntity[]; //Definindo a propriedade pedidos como uma entidade de pedidos na forma de array
}
