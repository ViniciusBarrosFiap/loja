import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

//Esse arquivo é responsável por verificar se um email será unico no banco de dados
@Injectable() //Definindo a classe como injetavel
@ValidatorConstraint({ async: true }) //Define a classe como um válidador customizado
//Implementando a classe obrigátoria para fornecer a lógica de um validador customizado
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  //Iniciando a váriavel com funções que serão usadas
  constructor(private usuarioService: UsuarioService) {}
  //Função para válidar se um email existe com base no valor passado como parâmetro
  //É uma promise que retornara um boolean
  async validate(value: string): Promise<boolean> {
    try {
      //Procurando um usuário com o email passado com a função .buscaPorEmail()
      const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
        value,
      );
      //Retorna true se o email não existir(email é unico)
      return !usuarioComEmailExiste;
    } catch (erro) {
      //Trata erros que podem ocorrer durante a requisição
      if (erro instanceof NotFoundException) {
        //Se esse erro ocorrer significa que o email não foi encontrado, logo ele é unico, retorna true
        return true;
      }
      //se não retorna o erro gerado
      return erro;
    }
  }
}
//Definindo e exportando o função email é unico
//Parâmetro: opções que serão válidas com o tipo ValidationOptions
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  //Retornando uma função que define como o decorator deve se comportar
  //Parâmetros: Objeto que será verificado, nome da propriedade que será verificada
  return (objeto: object, propriedade: string) => {
    //Responsável pelo comportamento do decorator
    registerDecorator({
      target: objeto.constructor, //Se refere ao objeto que contem a propriedade que será validada
      propertyName: propriedade, //Nome da propriedade que o decorator será aplicada
      options: opcoesDeValidacao, //Tipos de validação
      constraints: [], //Restrições na validação caso seja necessário
      validator: EmailEhUnicoValidator, //Referece a classe que possui a lógica de válidação
    });
  };
};
