import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
@Catch() //Define a classe como um filtro de execeção
export class filtroDeExcecaoGlobal implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost, //Injeta o adaptar do host para lidar com as requisições HTTP
    private loggerNativo: ConsoleLogger, //Injeta as funções do ConsoleLogger
  ) {}
  catch(excecao: unknown, host: ArgumentsHost) {
    //Método obrigatorio para lidar com as execeções capturadas
    this.loggerNativo.error(excecao); //Logga a execeção
    console.error(excecao); //Mostra no console a execeção
    const { httpAdapter } = this.adapterHost; //Extrai o adaptdador HTTP do host do adaptador
    const contexto = host.switchToHttp(); //Converte o host para o HTTP
    const resposta = contexto.getResponse(); //Obtem a respota da req
    const requsicao = contexto.getRequest(); //Obtem o objeto da solicitação HTTP
    //Loga o usuário que acessou a rota
    if ('usuario' in requsicao) {
      this.loggerNativo.log(
        `Rota acessada pelo usuário ${requsicao.usuario.sub}`,
      );
    }
    //Define o status HTTP e o corpo da resposta com base no tipo da execeção
    const { status, body } =
      excecao instanceof HttpException
        ? {
            status: excecao.getStatus(), //Obtem o status HTTP se houver
            body: excecao.getResponse(), //Obtem o body HTTP se houver
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR, //Define o status como 500
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR, //Corpo com status 500
              timestamp: new Date().toISOString(), //Adiciona a hora da execeção
              path: httpAdapter.getRequestUrl(requsicao), //Adiciona a rota que tentou acessar
            },
          };

    httpAdapter.reply(resposta, body, status); //Envia a resposta formatada pelo adaptador
  }
}
