import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDTO } from './dto/autentica.dto';

//Arquivo dedicado por conter os métodos das rotas

@Controller('autenticacao') //Define a classe como um controller
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login') //Rota Post para realizar o login
  login(@Body() { email, senha }: AutenticaDTO) {
    //Retorna o login do usuário usando a função .login(email do usuário, senha do usuároo)
    return this.autenticacaoService.login(email, senha);
  }
}
