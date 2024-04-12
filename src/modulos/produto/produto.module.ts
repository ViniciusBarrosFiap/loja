import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';

//Definindo que a classe é um módulo da aplicação
@Module({
  //Importando o produto entity para Feature do módulo Produtos
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController], //Dizendo qual classe é responsável por gerenciar a rota do módulo
  providers: [ProdutoService], //Especificando quais classes terão funções na aplicação
})
export class ProdutoModule {} //Exportando o module de produto
