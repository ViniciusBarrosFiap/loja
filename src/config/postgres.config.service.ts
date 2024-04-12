import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable() //Define a classe como injetável
export class PostgresConfigService implements TypeOrmOptionsFactory {
  //Inicia váriavel com as funções do ConfigService
  constructor(private configService: ConfigService) {}
  //Configura os dados para conexão com o banco de dados
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres', //Tipo do banco de dados
      host: this.configService.get<string>('DB_HOST'), //Host do DB
      port: this.configService.get<number>('DB_PORT'), //Porta do DB
      username: this.configService.get<string>('DB_USERNAME'), //Username para login do DB
      password: this.configService.get<string>('DB_PASSWORD'), //Senha para login do DB
      database: this.configService.get<string>('DB_NAME'), //Nome do database no banco
      entities: [__dirname + '/../**/*.entity.{js,ts}'], //entidades do DB
    };
  }
}
