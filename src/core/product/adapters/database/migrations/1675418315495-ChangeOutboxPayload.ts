import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOutboxPayload1675418315495 implements MigrationInterface {
  name = 'ChangeOutboxPayload1675418315495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "outbox_model" DROP COLUMN "payload"`);
    await queryRunner.query(
      `ALTER TABLE "outbox_model" ADD "payload" jsonb NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "outbox_model" DROP COLUMN "payload"`);
    await queryRunner.query(
      `ALTER TABLE "outbox_model" ADD "payload" character varying NOT NULL`,
    );
  }
}
