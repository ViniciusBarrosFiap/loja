import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

//Arquivo resposável por hasher a senha do usuário
@Injectable() //Define classe como injetavel
//Implementa a classe PipeTransform
export class HashSenhaPipe implements PipeTransform {
  //Inicia a váriavel com as funções do ConfigService
  constructor(private configService: ConfigService) {}
  //Método transform para transformar a senha
  //Parâmetros: senha
  async transform(senha: string) {
    const sal = this.configService.get<string>('SAL_SENHA'); //Extraindo o sal() - carcteres aleátorios definidos no .env
    const senhaHasheada = await bcrypt.hash(senha, sal!); //Hasheando a senha
    return senhaHasheada; //Retornamos a senha hasheada
  }
}
