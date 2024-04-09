import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}
@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    //.compare() faz a comparação da senha inserida com a senha no banco de dados
    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha,
    );

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('email ou senha está incorreta');
    }

    //Onde recebemos as informações do usuário, definimos quem irá receber o token kwt pelo Id
    const payload: UsuarioPayload = {
      sub: usuario.id, //subject -> sujeito
      nomeUsuario: usuario.nome,
    };
    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };
  }
}
