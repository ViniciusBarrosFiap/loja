import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

//Este arquivo é resposável por receber as solicitações http e chamar os serviços
//adequados para cada solicitação
@Controller('pedidos') //Definindo a rotá do modulo e a classe como controller
@UseGuards(AutenticacaoGuard) //Protegendo os métodos da rota, apenas usuários logados podem usa-las
export class PedidoController {
  //Iniciando a váriavel que contem as funções do .service
  constructor(private readonly pedidoService: PedidoService) {}

  @Post() //Método post da rota
  //Função para criar pedido
  async criaPedido(
    @Req() req: RequisicaoComUsuario, //Injeta o método para verificar se o token foi passado e é válido
    @Body() dadosDoPedido: CriaPedidoDTO, //Extrai dados do pedido do Body
  ) {
    const usuarioId = req.usuario.sub; //Acessa a propriedade usuário da req para obter o ID
    //Cria o pedido do usuário
    //Parâmetros: id do usuário que está fazendo o pedido, dados do pedido
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );
    //Retorna o pedido com uma mensagem
    return {
      mensagem: 'pedido feito com sucesso',
      pedido: pedidoCriado,
    };
  }

  @Get() //Método get da rota
  //Lista os pedidos de um usuário
  //Parâmetros: requisição
  async obtemPedidosDeUsuarios(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub; //Obtem o ID do usuário
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId); //Obtem os pedidos do usuário

    return pedidos; //Retorna os pedidos encontrados
  }

  @Put(':id') //Método Put da rota
  //Função para atualizar um produto
  async atualizaPedido(
    @Req() req: RequisicaoComUsuario, //Protegendo os métodos da rota, apenas usuários logados podem usa-las
    @Param('id') pedidoId: string, //Extraindo o id do produto dos params
    @Body() dadosDeAtualizacao: AtualizaPedidoDTO, //Extraindo os dados de atualizacao do Body
  ) {
    const usuarioId = req.usuario.sub; //Extraindo o ID do usuário
    //Atualiza o pedido com os novos dados
    const pedidoAtualizado = await this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDeAtualizacao,
      usuarioId,
    );
    //retorna o pedido Atualzado junto a uma mensagem
    return {
      pedido: pedidoAtualizado,
      mensagem: 'Pedido atualizado com sucesso',
    };
  }
}
