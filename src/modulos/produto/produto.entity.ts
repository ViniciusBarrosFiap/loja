import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoCaracteristicaEntity } from './produto-caracteisticas.entity';
import { ItemPedidoEntity } from '../pedido/itempedido.entity';

//Definindo a entidade(Tabela) de produtos

@Entity({ name: 'produtos' }) //Definindo a classe como uma entidade e o nome da tabela
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid') //Coluna da chave primária
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false }) //Coluna do nome
  nome: string;

  @Column({ name: 'valor', nullable: false }) //Coluna do valor
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false }) //Coluna da quantidade
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 255, nullable: false }) //Coluna da descricao
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false }) //Coluna da categoria
  categoria: string;

  @CreateDateColumn({ name: 'created_at' }) //Coluna da created
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' }) //Coluna da updated
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' }) //Coluna da deleted
  deletedAt: string;

  //Definindo o relacionamento de um pra muitos
  //Um pedido pode estar relacionado com muitas entidades ProdutoImagemEntity
  @OneToMany(
    () => ProdutoImagemEntity,
    //Lógica inversa, onde relacionamos a propriedade produto como chave estrangeira que referencia a entidade atual
    (produtoImagemEntity) => produtoImagemEntity.produto,
    //Define o comportamento do relacionamento
    //cascade: replica ações nas entidades relacionadas | eager: diz que quando a entidade atual for carregada, as entidades relacionadas tambem serão
    { cascade: true, eager: true },
  )
  imagens: ProdutoImagemEntity[]; //Define a propriedade com a entidade relacionada em forma de array

  //Define que um produto pode estar relacionado a muitas entidades de ProdutoCaracteriscaEntity
  @OneToMany(
    //Refêrencia a entidade que será relacionada
    () => ProdutoCaracteristicaEntity,
    //Lógica inversa: propriedade produto da entidade agora é a chave estrangeira que refêrencia a entidade atual
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
    //Comportamento
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[]; //Tipando com a entidade relacionda em forma de array
  //Um produto pode estar relacionados a muitas entidades ItemPedidoEntity
  //Entidade que será relacionada, relacionando propriedade da entidade com a entidade atual
  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedidoEntity[]; //Declarando como a entidade relacionada em forma de array
}
