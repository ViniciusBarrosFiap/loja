import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

//Este arquivo é responsável por conter a lógica com as regras de negócio do projeto
//Nesse arquivo usamos funções do repository

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

    return this.usuarioRepository.save(usuarioEntity);
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail == null)
      throw new NotFoundException('O email não foi encontrado');

    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (usuario) {
      Object.assign(usuario, novosDados);
      return this.usuarioRepository.save(usuario);
    } else {
      // Lida com o caso em que o usuário não é encontrado
      throw new Error(`Usuário com id ${id} não encontrado.`);
    }
  }

  async removeUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);
    if (!resultado.affected) {
      throw new NotFoundException('Este usuário não existe');
    }
  }
}
