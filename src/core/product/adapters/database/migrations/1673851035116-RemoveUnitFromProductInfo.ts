import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUnitFromProductInfo1673851035116
  implements MigrationInterface
{
  name = 'RemoveUnitFromProductInfo1673851035116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product-info" DROP COLUMN "unit"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product-info" ADD "unit" character varying NOT NULL`,
    );
  }
}
