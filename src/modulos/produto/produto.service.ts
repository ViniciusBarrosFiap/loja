import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

//Este arquivo é responsável por conter a lógica com as regras de negócio do projeto
//Nesse arquivo usamos funções do repository

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
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
    return produtosLista;
  }

  async encontraPorId(id: string) {
    const produtoEncontrado = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });

    if (!produtoEncontrado) {
      throw new NotFoundException('Produto com id não encontrado');
    }

    return produtoEncontrado;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    try {
      const entityName = await this.produtoRepository.findOneBy({ id });
      if (entityName === null) {
        throw new NotFoundException('O produto não foi encontrado');
      }
      Object.assign(entityName, novosDados);
      return this.produtoRepository.save(entityName);
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
      // Aqui você pode decidir se deseja lançar a exceção novamente ou retornar uma resposta personalizada
      throw error;
    }
  }

  async deletaProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);
    if (!resultado.affected) {
      throw new NotFoundException(`Não existe um produto com o ID "${id}"`);
    }
  }
}
