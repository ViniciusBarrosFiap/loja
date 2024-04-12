import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/statuspedido.enum';
//DTO para atualizar o pedido
export class AtualizaPedidoDTO {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
