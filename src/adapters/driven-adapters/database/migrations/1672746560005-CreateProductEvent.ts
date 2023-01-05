import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductEvent1672746560005 implements MigrationInterface {
  name = 'CreateProductEvent1672746560005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product-event" ("eventId" character varying NOT NULL, "eventName" character varying NOT NULL, "entityType" character varying NOT NULL, "entityId" character varying NOT NULL, "eventData" jsonb NOT NULL, "dateOccurred" TIMESTAMP NOT NULL, "productName" character varying NOT NULL, CONSTRAINT "PK_ac23637b728e6304eb4c5b0e2c4" PRIMARY KEY ("eventId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8192cdf49489cbf65c6ab095a8" ON "product-event" ("entityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f08c911c9d93b202daa061017c" ON "product-event" ("productName") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f08c911c9d93b202daa061017c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8192cdf49489cbf65c6ab095a8"`,
    );
    await queryRunner.query(`DROP TABLE "product-event"`);
  }
}
