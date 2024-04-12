import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ItemPedidoEntity } from './itempedido.entity';

@Entity({ name: 'pedidos' }) //Classificando a classe como entidade e o nome
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid') //Coluna chave primária
  id: string;
  @Column({ name: 'valor_total', nullable: false }) //Define as colunas do db, tamanho e se pode ser vázio
  valorTotal: number;
  @Column({ name: 'status', enum: StatusPedido, length: 255, nullable: false })
  status: StatusPedido;
  @CreateDateColumn({ name: 'created_at' }) //Define colunas de quando foi criado
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' }) //Define colunas de quando foi atualizado
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' }) //Define colunas de quando foi deletado
  deletedAt: string;
  //Relacionamento Muitos para um
  //Muitos pedidos podem se relacionar com apenas um usuário
  //lógica inversa: Referenciando pedidos do usuário a muitas entidades PedidosEntity
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  usuario: UsuarioEntity;
  //Um pedido pode estar relacionado a vários itens pedidos
  //Lógica inversa: Referenciando o itens pedido a apenas um pedido
  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
    cascade: true, //Replica ações do pedido aos itens do pedido
  })
  itensPedido: ItemPedidoEntity[]; //Definindo a entidade relacionada na forma de array
}
