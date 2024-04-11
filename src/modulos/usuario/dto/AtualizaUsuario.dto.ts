import { CriaUsuarioDTO } from './CriaUsuario.dto';
import { PartialType } from '@nestjs/mapped-types';

//DTO para atualizar o usuário
//Dizendo que o DTO para atualizar o usuário é parcialmente igual ao DTO de criaUsuario
export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}
