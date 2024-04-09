import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AutenticacaoService {
  constructor(private usuarioService: UsuarioService) {}

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

    console.log('Usuario autenticado');
  }
}
