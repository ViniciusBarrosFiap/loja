import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';

//Este arquivo é resposável por receber as solicitações http e chamar os serviços adequados para cada solicitação

@Controller('produtos') //Define classe como controller
export class ProdutoController {
  //Inicia váriavel com as funções do .service
  constructor(private readonly produtoService: ProdutoService) {}

  //Parâmetros: dados do produto
  @Post() //Método post para criar usuário
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    //Criando produto com função .criaProduto()
    const produtoCadastrado = await this.produtoService.criaProduto(
      dadosProduto,
    );
    //Retorna objeto com mensagem e o produto criado
    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }

  @Get() //Método Get para listar os produtos
  @UseInterceptors(CacheInterceptor) //Aplica um método especifico, no caso um gerenciador de cache
  async listaTodos() {
    return this.produtoService.listaProdutos(); //Retorna a lista de produtos
  }

  //Parâmetros: ID do produto
  @Get(':id') //Método Get para achar um produto com a ID
  @UseInterceptors(CacheInterceptor) //Método aplicado para gerenciar o cache
  async buscaProdutoPorId(@Param('id') id: string) {
    const produto = this.produtoService.encontraPorId(id); //Busca produto com ID
    return produto; //Retorna produto encontrado
  }

  //Parâmetros: ID do produto(na url), dados novos(no body)
  @Put(':id') //Método Put para alterar um produto
  async atualiza(
    @Param('id') id: string, //Extrai o id dos param da requisição
    @Body() dadosProduto: AtualizaProdutoDTO, //Extrai os dados do produto do body da req
  ) {
    //Altera produto com os novos dados
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );
    //Retorna o produto atualizado junto a uma mensagem
    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }
  //Parâmetros: ID do produto
  @Delete('/:id')
  //Extrai o id dos params
  async remove(@Param('id') id: string) {
    //Remove o produto cadastrado
    const produtoRemovido = await this.produtoService.deletaProduto(id);
    //Retorna o produto excluido junto a uma mensagem
    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
