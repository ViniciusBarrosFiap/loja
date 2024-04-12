import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
//Cria entidade dos itens que forem ser pedidos pelos usuários (tabela auxiliar)
@Entity({ name: 'itens_pedidos' }) //Define a classe como entity
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid') //coluna chave primária
  id: string;

  @Column({ name: 'quantidade', nullable: false }) //Coluna quantidade
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false }) //Tabela do preco de venda
  precoVenda: number;

  //Relacionamento muitos para um
  //Muitos itens podem estar relacionados apenas um pedido
  //Lógica inversa: um pedido pode conter vários itens pedidos
  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE', //Se o pedido for deletado o item pedido tambem será deletado
    onUpdate: 'CASCADE', //Se o pedido for atualizado o item pedido tambem será atualizado
  })
  pedido: PedidoEntity; //Atrelando a propriedade com a entidade relacionada
  //Relacionamento muitos para um
  //Muitos itens podem estar relacionados a um unico produto
  //Lógica inversa: um produto pode estar relacionado a muitos itens pedidos
  @ManyToOne(() => ProdutoEntity, (produto) => produto.itensPedido, {
    cascade: ['update'],
  })
  produto: ProdutoEntity;
}
