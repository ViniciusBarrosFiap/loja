import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
@Catch()
export class filtroDeExcecaoGlobal implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) {}
  catch(excecao: unknown, host: ArgumentsHost) {
    console.log(excecao);
    const { httpAdapter } = this.adapterHost;
    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requsicao = contexto.getRequest();

    const { status, body } =
      excecao instanceof HttpException
        ? {
            status: excecao.getStatus(),
            body: excecao.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(requsicao),
            },
          };

    httpAdapter.reply(resposta, body, status);
  }
}
