/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    //     throw new Error("Method not implemented.");
    // }
    createTypeOrmOption():TypeOrmModuleOptions{
        return{
            type: "postgres",
            host: "127.0.0.1",
            port: 5432,
            username: "root",
            password: "root",
            database: "loja",
            entities: [],
            synchronize: true
        }
    }
}