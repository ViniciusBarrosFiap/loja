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

@Entity({ name: 'pedidos' }) //Classificando como entidade e o nome
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
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
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  usuario: UsuarioEntity;
  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
    cascade: true,
  })
  itensPedido: ItemPedidoEntity[];
}
