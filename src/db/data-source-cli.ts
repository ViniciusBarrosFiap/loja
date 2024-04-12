import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

//Configura uma fonte de dados para o typeORM e um ORM para o typescript

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', //tipo do banco de dados
  host: process.env.DB_HOST, //host do banco de dados
  port: Number(process.env.DB_PORT), //porta do banco de dados
  username: process.env.DB_USERNAME, //username do banco de dados
  password: process.env.DB_PASSWORD, //password do banco de dados
  database: process.env.DB_NAME, //database do banco de dados
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //caminho para entidades do banco de dados
  migrations: [__dirname + '/migrations/*.{js,ts}'], //caminho para as migrations
};

const dataSource = new DataSource(dataSourceOptions); //preenchendo o DataSource com as configuraçãoes feitas

export default dataSource; //Exportando instancia do DataSource
