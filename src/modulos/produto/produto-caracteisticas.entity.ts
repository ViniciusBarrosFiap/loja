import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_caracteristicas') //Define a classe como entidade
export class ProdutoCaracteristicaEntity {
  @PrimaryGeneratedColumn('uuid') //Coluna chave primaria
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false }) //Coluna nome
  nome: string;

  @Column({ name: 'descricao', length: 255, nullable: false }) //Coluna descricao
  descricao: string;

  //Relacionamento muitos para um
  //Muitas da entidade atual podem se relacionar com apenas uma entidade
  //Muitas ProdutoCaracteristicaEntity se relacionam com um ProdutoEntity
  //Lógica inversa: define que "caracteristicas" serão relacionadas com muitas da entidade atual
  @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas)
  produto: ProdutoEntity; //Define como a entidade que está sendo referenciada
}
