/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProdutoModule } from './product/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
  UserModule, 
  ProdutoModule,
  ConfigModule.forRoot({
    isGlobal: true,

  }),
  TypeOrmModule.forRootAsync({
    useClass: PostgresConfigService,
    inject: [PostgresConfigService]
  })
]  
})

export class AppModule {}
