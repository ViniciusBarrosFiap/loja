import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

//DTO para definir as propriedades dos itens a serem pedidos
export class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;
  @IsInt()
  quantidade: number;
}
//Define as regras para criar um pedido
export class CriaPedidoDTO {
  @ValidateNested() //Vé se está aninhado
  @IsArray() //Verifica se é um array
  @ArrayMinSize(1) //Define a quantidade minima de itens pedidos
  @Type(() => ItemPedidoDTO) //Tipo de dado que a propriedade vai receber
  itensPedido: ItemPedidoDTO[]; //Atrelando os itens pedidos
}
