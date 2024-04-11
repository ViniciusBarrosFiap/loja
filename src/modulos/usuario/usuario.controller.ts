import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HashSenhaPipe } from '../../recursos/pipes/hash-senha.pipe';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

import { UsuarioService } from './usuario.service';

//Este arquivo é resposável por receber as solicitações http e chamar os serviços adequados para cada solicitação

@Controller('/usuarios') //Definindo a classe como um controller e o caminho da rota
export class UsuarioController {
  //Iniciando a váriavel com as funções que serão usadas
  constructor(private usuarioService: UsuarioService) {}
  @Post() //Definindo um método post com a função de criar um usuário
  async criaUsuario(
    //Separando a senha do resto dos dados do novo usuário
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO, //Extrair os dados do body da requisição
    //Aplicando o pipe para hashear a senha e atribuindo a senha hasheada a váriavel senhaHasheada
    @Body('senha', HashSenhaPipe) senhaHasheada: string,
  ) {
    //Criando o novo usuário com a função .criaUsuario()
    //Salvando normalmente todos os dados com o spread e salvando a senha hasheada em "senha"
    const usuarioCriado = await this.usuarioService.criaUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });
    //Retornando um objeto com o usuário criado mostrando apenas as informações definidas no DTO listaUsuario junto com uma mensagem
    return {
      usuario: new ListaUsuarioDTO(
        usuarioCriado.id,
        usuarioCriado.nome,
        usuarioCriado.email,
      ),
      messagem: 'usuário criado com sucesso',
    };
  }
  //Definindo o método Get da rota
  @Get()
  async listUsuarios() {
    //Retornando uma lista de usuários com a função .listaUsuarios()
    return await this.usuarioService.listaUsuarios();
  }
  //Definindo o método Put da rota
  //Parâmetros: ID do usuário
  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string, //Extraindo o parâmetro ID da requisição e armazenando em uma váriavel
    @Body() novosDados: AtualizaUsuarioDTO, //Extraindo os dados do body da requisição e armazenando em uma váriavel
  ) {
    //Atualizando o usuário  com a função .atualizaUsuario()
    //Parâmetros: ID do usuário, novos dados
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );
    //Retornando um objeto com o usuário atualizado e uma mensagem
    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }
  //Definindo o método Delete da rota
  //Parâmetros: ID do usuário
  @Delete('/:id')
  //Extraindo o parâmetro id da requisição e armazenando em uma váriavel
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.removeUsuario(id); //Removendo o usuário com a função .removeUsuario()
    //Retornando um objeto com o usuário removido e uma mensagem
    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }
}
