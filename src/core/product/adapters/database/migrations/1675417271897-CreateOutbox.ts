import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOutbox1675417271897 implements MigrationInterface {
  name = 'CreateOutbox1675417271897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "outbox_model" ("id" SERIAL NOT NULL, "payload" character varying NOT NULL, "messageType" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_63a29736050b08f9b8a59f78ccf" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "outbox_model"`);
  }
}
