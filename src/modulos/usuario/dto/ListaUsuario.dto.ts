//Definindo o DTO que será chamado quando for necessário listar informações do usuário
//Define informações especificas que serão listadas
export class ListaUsuarioDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly email: string,
  ) {}
}
