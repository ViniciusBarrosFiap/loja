import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './CriaProduto.dto';
//Define que o DTO de atualizar o pedido é parcialmente igual ao DTO de criar produto
export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {}
