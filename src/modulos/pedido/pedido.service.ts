import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

//Este arquivo é responsável por conter a lógica com as regras de negócio do projeto

@Injectable() //Define a classe como injetavel
export class PedidoService {
  //Iniciando váriaveis com as funções necessárias do repository
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}
  //Função para bucar usuário
  //Parâmetros: ID do usuário
  private async buscaUsuario(id) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    //Trata erro caso não encontre o usuário
    if (usuario === null) {
      throw new NotFoundException('O usuario não foi encontrado');
    }
    return usuario; //Retorna usuário encontrado
  }

  //Função para tratar os dados do pedido antes dele ser criado
  //Parâmetros: dados do pedido, produto relacionado
  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    //Iterando sobre todos os itens pedidos em um pedido
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      //Procurando o produto relacionado com base na id do item pedido
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      //Se for undefined retorna que não foi encotrado
      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado`,
        );
      }
      //Se a quantidade do item pedidor for maior que a disponivel retorna um erro
      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior que a disponivel (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`,
        );
      }
    });
  }

  //Função para cadastrar um pedido
  //Parâmetros: ID do usuário que está comprando, dados do pedido do usuário
  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId); //Bucando usuário
    //Extraindo a id dos produtos do pedido
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    //Busca os produtos que foram relacionados no pedido
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
    const pedidoEntity = new PedidoEntity(); //Cria uma nova instancia do Pedido entity para ser preenchida
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO; //Define o status do pedido pelo enum
    pedidoEntity.usuario = usuario; //Associando pedido ao usuário
    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados); //Verifica os dados passados para criar o pedido (se o produto existe e tem estoque disponivel)

    //Cria uma instancia ItemPedido para cada item do pedido
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      //Busca o produto que foi especificado no pedido
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      const itemPedidoEntity = new ItemPedidoEntity(); //Cria a instancia do itemPedido

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      itemPedidoEntity.produto = produtoRelacionado!; //Relaciona a propriedade produto com o produto encontrado
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor; //Relaciona o preço com o valor do produto
      itemPedidoEntity.quantidade = itemPedido.quantidade; //Relaciona a quantidade do itemPedido com a quantidade do pedido
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade; //Subtrai da quantidade disponivel a quantidade que foi pedida
      return itemPedidoEntity;
    });
    //Calculando o valor total do pedido
    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades; //Relaciona os itens pedidos com a entidade pedidoEntity

    pedidoEntity.valorTotal = valorTotal; //Relaciona o valor total calculado com a propriedade 'valorTotal' do PedidoEntity

    const pedidoCriado = this.pedidoRepository.save(pedidoEntity); //Salvando o pedido criado
    return pedidoCriado; //Retornando o pedido criado
  }
  //Função para obter os pedidos do usuário
  //Parâmetros: ID do usuário
  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      //Mostra onde deve procurar
      where: {
        usuario: { id: usuarioId },
      },
      //Indica as relações que devem ser carregadas junto
      relations: {
        usuario: true,
      },
    });
  }
  //Função para atualizar o pedido de um usuário
  //Parâmetros: ID do pedido, novos dados, id do usuário
  async atualizaPedido(id: string, dto: AtualizaPedidoDTO, usuarioId: string) {
    //Buscando pedido do usuário
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      //Relacionando o usuário com a busca
      relations: { usuario: true },
    });
    //Tratamento de erro caso não seja encontrado
    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }
    //Erro caso o ID de usuário passado for diferente do ID de usuário cadastrado no pedido
    if (pedido.usuario.id !== usuarioId) {
      throw new ForbiddenException(
        'Você não tem autorizaçõ para atualizar esse pedido',
      );
    }
    Object.assign(pedido, dto as PedidoEntity); //Associa os novos dados com o pedido encontrado

    return this.pedidoRepository.save(pedido); //Salva o pedido atualizado
  }
}
