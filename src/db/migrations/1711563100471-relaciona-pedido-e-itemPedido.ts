import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionaPedidoEItemPedido1711563100471
  implements MigrationInterface
{
  name = 'RelacionaPedidoEItemPedido1711563100471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "itens_pedido" ADD "pedidoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP COLUMN "preco_venda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD "preco_venda" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD CONSTRAINT "FK_ab2b96858c45196d22cce672215" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP CONSTRAINT "FK_ab2b96858c45196d22cce672215"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP COLUMN "preco_venda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD "preco_venda" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" DROP COLUMN "pedidoId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedido" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
