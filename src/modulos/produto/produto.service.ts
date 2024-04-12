import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

//Este arquivo é responsável por conter a lógica com as regras de negócio do projeto
//Irá conter as funções que serão usadas no controller

@Injectable() //Indica que a classe é injetavel
export class ProdutoService {
  //Inicia a váriavel que contem as função do Repository para o ProdutoEntity
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}
  //Função para criar um produto
  //Parâmetros: dados do produto, seguindo padrão estabelecido no DTO
  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity(); //Instanciando a entidade do produto para ser preenchida com os novos dados

    Object.assign(produtoEntity, dadosProduto as ProdutoEntity); //Atribuindo a entidade do produto para ser preenchida com os dados do produto

    return this.produtoRepository.save(produtoEntity); //Retornando o produto salvo com a função .save()
  }
  //Função para listar os produtos cadastrados
  async listaProdutos() {
    //Buscando todos os produtos cadastrados no banco de dados
    const produtosSalvos = await this.produtoRepository.find({
      //Dizendo que é para relacionar outras duas entidades
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    //Iterando na lista de produtos e retornando um objeto padronizado pelo DTO
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.valor,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    //Retornando a lista de produtos
    return produtosLista;
  }
  //Função para encontrar um produto especifico pela ID
  //Parâmetros: ID do cliente
  async encontraPorId(id: string) {
    //Buscando o ID passado
    const produtoEncontrado = await this.produtoRepository.findOne({
      where: { id }, //Váriavel para dar match
      //Relacionando com outras entidades
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    //Se o produto não for encotrado retornamos um erro com uma mensagem
    if (!produtoEncontrado) {
      throw new NotFoundException('Produto com id não encontrado');
    }
    //Retornando o produto encontrado
    return produtoEncontrado;
  }
  //Função para atualizar um produto encontrado
  //Parâmetros: ID do produto
  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    try {
      //Buscando o produto pela ID
      const entityName = await this.produtoRepository.findOneBy({ id });
      //Caso o produto não seja encontrado retornará um erro com uma mensagem
      if (entityName === null) {
        throw new NotFoundException('O produto não foi encontrado');
      }
      //Caso seja encontrado irá atrelar o mesmo com os novos dados
      Object.assign(entityName, novosDados);
      //Retornando o produto atualizado com a função .save()
      return this.produtoRepository.save(entityName);
    } catch (error) {
      throw new Error(`Produto com ${id} não encontrado`);
    }
  }
  //Removendo um produto do banco de dados
  async deletaProduto(id: string) {
    //Buscando e deletando o produto com a função .delete()
    const resultado = await this.produtoRepository.delete(id);
    //Caso não seja encontrado irá retornar um erro
    if (!resultado.affected) {
      throw new NotFoundException(`Não existe um produto com o ID "${id}"`);
    }
  }
}
