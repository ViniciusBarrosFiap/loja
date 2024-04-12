import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/autenticacao.guard';

@Injectable() //Define a classe como injetável
export class LoggerGlobalInterceptor implements NestInterceptor {
  //Inicia a váriavel com as funções do ConsoleLogger
  constructor(private logger: ConsoleLogger) {}
  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = contexto.switchToHttp(); //Troca contexto para HTTP
    //Define que a requisição é do tipo Request ou do tipo RequisicaoComUsuario
    const requisicao = contextoHttp.getRequest<
      Request | RequisicaoComUsuario
    >();
    const resposta = contextoHttp.getResponse<Response>(); //Extrai a resposta da req

    const { path, method } = requisicao; //Divide a requisição em caminho e método usado
    const { statusCode } = resposta; //Extrai o status da requisição
    this.logger.log(`${method} ${path}`); //Mostra o log da requisição
    const instantePreControlador = Date.now(); //Inicia o temporizador para calcular o tempo de execução
    //Retorna os log que ocorreram na requisição
    return next.handle().pipe(
      tap(() => {
        //Se houver 'usuario' na requisição irá mostrar quem é
        if ('usuario' in requisicao) {
          //Loggando o usuário que acessou a rota
          this.logger.log(
            `Rota acessada pelo usuário: ${requisicao.usuario.sub}`,
          );
        }
        const tempoDeExecucao = Date.now() - instantePreControlador; //Calculando o tempo de execução
        //Loggando o status da requisição e o tempo de execução
        this.logger.log(
          `Resposta: status ${statusCode} - Tempo de execução: ${tempoDeExecucao}ms`,
        );
      }),
    );
  }
}
