import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

//Definindo módulo de autenticação

@Module({
  imports: [
    UsuarioModule, //Importa o modulo de usuário
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SEGREDO_JWT'), //Atribui a chave segreta do JWT
          signOptions: { expiresIn: '72h' }, //Define o tempo que o token é válido
        };
      },
      inject: [ConfigService], //Injeta o ConfigService para acessar o token
      global: true, //Permite que seja usado em toda aplicação
    }),
  ],
  controllers: [AutenticacaoController], //Declara o controller da autenticação
  providers: [AutenticacaoService], //Declara a classe responsável pela lógica de autenticação
})
export class AutenticacaoModule {} //Exporta o módulo
