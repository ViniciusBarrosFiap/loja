import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, ValidateNested } from 'class-validator';

export class ItemPedidoDTO {
  @IsInt()
  quantidade: number;
}

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
