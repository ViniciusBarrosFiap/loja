//Define DTO para o objeto das caracteristicas
class ListaCaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}
//Define DTO para o objeto das imagens
class ListaImagemProdutoDTO {
  url: string;
  descricao: string;
}
//Define DTO para padronizar as propriedades que serão listadas na requisição
export class ListaProdutoDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly valor: number,
    readonly caracteristicas: ListaCaracteristicaProdutoDTO[],
    readonly imagens: ListaImagemProdutoDTO[],
  ) {}
}
