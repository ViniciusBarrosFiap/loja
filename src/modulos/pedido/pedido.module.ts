import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ProdutoEntity } from 'src/modulos/produto/produto.entity';

//Define o módulo pedidos como um módulo da aplicação

@Module({
  //Importando classes que terão dunção dentro do modulo de pedido
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity]),
  ],
  controllers: [PedidoController], //Define a classe responsável por ser o controller do módulo
  providers: [PedidoService], //Define a classe onde irá conter as funções com regras de negócio do módulo
})
export class PedidoModule {}
