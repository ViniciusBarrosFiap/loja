import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsuarioPayload } from './autenticacao.service';
import { JwtService } from '@nestjs/jwt';
//Extende o Request do express adicionando a propriedade usuario com as propriedades do payload
export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}
@Injectable() //Define a classe como injetavel
//Implementando a interface CanActive que verifica se a req possui um JWT válido
export class AutenticacaoGuard implements CanActivate {
  //Iniciando a váriavel com as funções
  constructor(private jwtService: JwtService) {}
  //ExecutionContext: fornece a descrição de uma requisição para a váriavel do parâmetro
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto
      .switchToHttp() //Troca a req para HTTP
      .getRequest<RequisicaoComUsuario>(); //Extrai o objeto com propriedades da req e espera que seja igual a interface RequisicaoComUsuario
    const token = this.extrairTokenDoCabecalho(requisicao); //Váriavel para armazenar o token
    //Tratamento de erros caso não haja token
    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }
    try {
      //Tentando válidar o token
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload; //Atribundo o token válidado a propriedade usuário da req
    } catch (error) {
      //Tratamento de erro caso token não seja válido
      throw new UnauthorizedException('JWT inválido');
    }
    return true; //Retorna true caso tudo ocorra bem
  }
  //Função para extrair o token do cabeçalho, retorna o token ou undefined
  //Parâmetros: requisição(do tipo Request)
  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    //formato do cabeçalho authorization: "Bearer <jwt>" -> protocolo HTTP
    //Acessa o cabeçalho e acessa a propriedade authorization e  o tipo do token
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined; //Se fo "Bearer" retorna o token guardado, se não 'undefined'
  }
}
