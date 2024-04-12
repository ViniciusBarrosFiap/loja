import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './modulos/produto/produto.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { filtroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './recursos/interceptores/logger-global.interceptor';
@Module({
  //Define as classes que fazem parte da aplicação principal com suas funcionalidades
  imports: [
    UsuarioModule,
    ProdutoModule,
    //Configura as configurações de modo global para toda aplicação
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Modulo para integrar o TypeOrm com o nest
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService, //Injeta configurações do banco de dados (PostgresSQL)
      inject: [PostgresConfigService], //Injeta as funcionalidades que serão aplicadas no banco de dados
    }),
    PedidoModule,
    //Configurando o gerenciamento de cache de forma assincrona
    CacheModule.registerAsync({
      //Configurando o redis como gerenciador de cache
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true, //Tornando a configuração global
    }),
    AutenticacaoModule,
  ],
  //Provedores de outras funções que serão utilizadas no código
  providers: [
    {
      provide: APP_FILTER, //Filtro de exeções
      useClass: filtroDeExcecaoGlobal, //Filtro para tratar exeçõe globalmente
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger, //Log de operações que ocorrem na aplicação
  ],
})
export class AppModule {}
