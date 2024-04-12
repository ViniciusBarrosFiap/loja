import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' }) //Definindo a classe como uma entidade e seu nome
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid') //Coluna chave primaria
  id: string;

  @Column({ name: 'url', length: 100, nullable: false }) //Coluna ur;
  url: string;

  @Column({ name: 'descricao', length: 100, nullable: false }) //Coluna descrição
  descricao: string;

  //Relacionamento muitos para um
  //Muitas da entidade atual podem se relacionar com apenas uma entidade
  //Muitas ProdutoImagemEntity se relacionam com um ProdutoEntity
  //Lógica inversa: define que imagens serão relacionadas com muitas da entidade atual
  @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens, {
    orphanedRowAction: 'delete', //Define a ação realizada caso a entidade atual fique sem pai
    onDelete: 'CASCADE', //Se deletar o pai irá replicar na entidade atual
    onUpdate: 'CASCADE', //Se atualizar o pai irá replicar na entidade atual
  })
  produto: ProdutoEntity; //Define como a entidade que está sendo referenciada
}
