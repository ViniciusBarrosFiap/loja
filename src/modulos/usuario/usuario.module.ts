//Fazendo importações necessárias para o module de usuário
import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

//Arquivo responsável por juntar as classes e módulos que serão usadas no módulo usuário

//@Module é usado para especificar que é um modulo da aplicação
@Module({
  //Dizendo que a UsuarioEntity é uma parte do módulo e será usada como função
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  //Defindo o arquivo onde as rotas serão tratadas no módulo de usuário
  controllers: [UsuarioController],
  //Definindo outras classes que serão usadas e terão função no módulo de usuário
  providers: [UsuarioService, EmailEhUnicoValidator],
  //Especificando quais modulos poderão ser usados em outros módulos da aplicação
  exports: [UsuarioService],
})
//Exportando o module
export class UsuarioModule {}
