import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

//Este arquivo é responsável por conter a lógica com as regras de negócio do projeto
//Irá conter as funções que serão usadas no controller
@Injectable() //Decorator -> Indica que essa classe poderá ser injetada
export class UsuarioService {
  //Usando constructor para iniciar a váriavel com o repository
  constructor(
    @InjectRepository(UsuarioEntity) //Indicando que será injetado um repositório com as caracteristicas do usuário
    private readonly usuarioRepository: Repository<UsuarioEntity>, //Nomeando a váriavel que irá conter as funções do repository
  ) {}
  //Função para listar todos os usuários cadastrados no banco de dados
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find(); //Usando o .find() para retornar um array com os usuários
    //Usando o .map() para iterar sobre cada usuario gerando um objeto de cada usuário
    const usuariosLista = usuariosSalvos.map(
      //A cada usuário será gerado um objeto com as caracteristicas definidas
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome, usuario.email),
    );
    return usuariosLista; //Retornamos a lista de usuários gerada
  }
  //Função para criar um usuário
  //Parâmetros: dados do novo usuário -> caracteristicas definidas no DTO
  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity(); //Instanciando uma nova entidade de usuário

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity); //Atrelando a entidade instanciada com os dados no novo usuário

    return this.usuarioRepository.save(usuarioEntity); //Retornando o usuário salvo com a função .save()
  }
  //Função para buscar um usuário pelo email
  //Parâmetros: email do usuário
  async buscaPorEmail(email: string) {
    //Buscando um email especifico com a função .findOne()
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email }, //Definindo qual váriavel é para dar match na busca
    });
    //Condição para retornar um erro caso a busca retorne null
    if (checkEmail == null)
      throw new NotFoundException('O email não foi encontrado'); //erro de NotFoundExepction

    return checkEmail; //Retornando o email caso seja encontrado
  }
  //Função para atualizar um usuário
  //Parâmetros: ID do usário, novos dados
  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    //Verificando se o id passado existe
    const usuario = await this.usuarioRepository.findOneBy({ id });
    //Condição para caso o usuário exista
    if (usuario) {
      Object.assign(usuario, novosDados); //Atrelando o usuário encontrado com os novos dados passados
      return this.usuarioRepository.save(usuario); //Retornando o usuário e salvando
    } else {
      // Lida com o caso em que o usuário não é encontrado
      throw new Error(`Usuário com id ${id} não encontrado.`);
    }
  }
  //Função para deletar um usuário do banco de dados
  //Parâmetros: ID do usuário
  async removeUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id); //Deletando o usuário com a função .delete()
    //Condição para caso o usuário não exista
    if (!resultado.affected) {
      throw new NotFoundException('Este usuário não existe'); //Gera um erro caso não encontre o usuário
    }
  }
}
