import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//Definindo a lógica de autenticação

//Definindo a interface do PayLoad do usuário
export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}
@Injectable() //Definindo a classe como injetavel
export class AutenticacaoService {
  //Iniciando as váriaveis com as funções necessarias
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  //Método que irá realizar o login
  //Parâmetros: email do usuário, senha do usuário
  async login(email: string, senhaInserida: string) {
    //Buscando usuário pelo email passado
    const usuario = await this.usuarioService.buscaPorEmail(email);

    //.compare() faz a comparação da senha inserida com a senha no banco de dados
    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha,
    );
    //Tratamento de erro caso não seja autenticado
    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('email ou senha está incorreta');
    }

    //Onde recebemos as informações do usuário
    //Definimos quem irá receber o token jwt pelo Id
    const payload: UsuarioPayload = {
      sub: usuario.id, //subject -> sujeito
      nomeUsuario: usuario.nome,
    };
    //Retorna o token gerado caso tenha sido autenticado
    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };
  }
}
