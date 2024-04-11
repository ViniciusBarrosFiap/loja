import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

//Define o DTO com as caracteristicas necessárias para criar um usuário

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' }) //Diz que não pode ser vázio
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' }) //Valida o formato do email
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' }) //Decorator para verificar se já existe um usuário com o email a ser cadastrado
  email: string;

  //Define o tamanho minimo para poder cadastrar a senha
  @IsNotEmpty()
  @MinLength(6, {
    message: 'A senha deve ter pelo menos 6 caracteres',
  })
  senha: string;
}
//Expressão regular - validação de senha
// @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
//   message:
//     'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
// })
